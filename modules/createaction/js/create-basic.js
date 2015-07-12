require('../../../common/pkgs/button/button');
//require('../../../common/pkgs/progress/progress');
var common = require('../../../lib/common/common.js');
require('../../../lib/jquery-form/jquery.form');
require('../../../lib/jquery-form/validform');
require('../../../lib/jquery-form/validform.less');
require('../css/create');


var utils = {
    warn: function(msg){
        alert(msg);
    }
}


$(function() {
    common.initNav();

    var $pageCreateAction = $('#pageCreateAction');

    var $createActionStep = $pageCreateAction.find('#createActionStep.step-01');

    var main = {
        init: function(){
            this.initEvent();
        },
        initEvent: function() {
            this.initCheckForm();
            this.initFormEvent();
            this.initDatePicker();
        },
        initDatePicker: function() {
            var $appDate = $(".select-date-time");
            if ($appDate.length){
                var currYear = (new Date()).getFullYear();
                var opt={};
                opt.date = {preset : 'date'};
                opt.datetime = {preset : 'datetime'};
                opt.time = {preset : 'time'};
                opt.default = {
                    theme: 'android-ics light', //皮肤样式
                    display: 'modal', //显示方式
                    mode: 'scroller', //日期选择模式
                    dateFormat: 'yyyy-mm-dd',
                    lang: 'zh',
                    showNow: true,
                    nowText: "今天",
                    startYear: currYear - 10, //开始年份
                    endYear: currYear + 10 //结束年份
                };
                 var optDateTime = $.extend(opt['datetime'], opt['default']);
                $appDate.mobiscroll(optDateTime).datetime(optDateTime);
            }

        },
        initFormEvent: function(){

            $createActionStep.submit(function() {
                var name = $('#name').val();
                var host = $('#host').val();
                var prov = $('#prov').val();
                var city = $('#city').val();
                var addr = $('#detail-addr').val();
                var durationDay = $('#id_day').val();
                var durationHour = $('#id_hour').val();
                var durationMin = $('#id_minute').val();
                var maxAttendee = $('#id_max_attend').val();
                var bonus = $('#id_reward').val();
                var desc = $('#desc').val();
                var actionType = $('#action-type').val();
                var poster = $('#poster').val();

                $(this).ajaxSubmit({
                    beforeSubmit: function(formData, jqForm, options) {
                        if (!name) {
                            utils.warn('请填写活动名称!');
                            return false;
                        }

                        if (!host) {
                            utils.warn('请填写主办方!');
                            return false;
                        }

                        if (!prov) {
                            utils.warn('请选择省份!');
                            return false;
                        }

                        if (!city) {
                            utils.warn('请选择城市!');
                            return false;
                        }

                        if (!addr) {
                            utils.warn('请填写具体的地址!');
                            return false;
                        }

                        if (durationDay === '') {
                            utils.warn('请填写持续天数!');
                            return false;
                        }

                        if (+durationDay < 0) {
                            utils.warn('天数应该大于等于0天!');
                            return false;
                        }

                        if (durationHour === '') {
                            utils.warn('请填写持续小时数!');
                            return false;
                        }

                        if (+durationHour < 0 || +durationHour > 23) {
                            utils.warn('小时数不合法!');
                            return false;
                        }

                        if (durationMin === '') {
                            utils.warn('请填写持续分钟数!');
                            return false;
                        }

                        if (+durationMin < 0 || +durationMin > 59) {
                            utils.warn('分钟数不合法!');
                            return false;
                        }

                        if (maxAttendee === '') {
                            utils.warn('请填写持续分钟数!');
                            return false;
                        }

                        if (maxAttendee <= 0) {
                            utils.warn('参与人数应该大于0!');
                            return false;
                        }

                        if (bonus < 0) {
                            utils.warn('奖励金额值不合法!');
                            return false;
                        }

                        if (!desc) {
                            utils.warn('请填写活动简介!');
                            return false;
                        }

                        if (actionType === '') {
                            utils.warn('请选择活动类型!');
                            return false;
                        }

                        if (!poster) {
                            utils.warn('请选择活动海报!');
                            return false;
                        }

                        if (!/\.(jpg|png)$/.test(poster)) {
                            utils.warn('活动海报海报仅支持png/jpg格式的文件!');
                            return false;
                        }
                    },
                    dataType: 'json',
                    success: function(res) {
                        var success = res && res.success;
                        var data = res && res.data;

                        if (success) {
                            if (data.url) {
                                location.href = data.url;
                            }
                        } else {
                            for (var key in data) {
                                $('#' + key).removeClass('focus').addClass('err');
                                utils.warn(data[key]);
                                break;
                            }
                        }
                    },
                    error: function() {
                        console.error('擦了，创建活动提交失败~')
                    }
                });

                return false;
            })
        },
        initCheckForm: function() {

            var $form=$("form#createActionStep").Validform({
                tiptype:3,
                label:".label",
                showAllError:true,
                datatype:{
                    "zh1-6":/^[\u4E00-\u9FA5\uf900-\ufa2d]{1,6}$/
                },
                ajaxPost:true
            });

            //$.Tipmsg.w["zh1-6"]="请输入1到6个中文字符！";
            $form.tipmsg.w["zh1-6"]="请输入1到6个中文字符！";

            $form.addRule([{
                ele:"#name",
                datatype:"*2-20"
            },
                {
                    ele:"#host",
                    datatype:"*4-20"
                }
            ]);

        }
    };

    main.init();


});