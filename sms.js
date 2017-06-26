/**
 *
 * 阿里云短信发送接口 nodejs 版本
 * 阿里云短信API官方文档: https://help.aliyun.com/document_detail/44364.html?spm=5176.8195934.507901.11.pLzahV
 * git地址：github: https://github.com/freecto
 * 参考：https://github.com/freecto/aliyun-nodejs-sdk-smsV1
 *
 */

var request = require('request');
var crypto = require('crypto');

var AliyunSmsUtil = {
    config: {
        AccessKeyId: '***',				//阿里短信服务所用的密钥
        AccessKeySecret: "***",         //阿里短信服务所用的密钥值
        Format: 'JSON',
        SignatureMethod: 'HMAC-SHA1',
        SignatureVersion: '1.0',
        SignatureNonce: "" + Math.random(),
        Timestamp: new Date().toISOString(),
        Action: 'SendSms',
        Version: '2017-05-25',
        RegionId: 'cn-hangzhou'
    },

    /**
     * 阿里云短信发送接口
     * @param data  发送短信的参数，参考：最后sendRegistSms示例
     * @param callback 发送短信后的回调函数
     */
    _sendMessage: function (data, callback) {
        var param = Object.assign(data, this.config);
        delete param.AccessKeySecret
        param.Signature = this._signParameters(param, this.config.AccessKeySecret);

        request.post({
            url: 'http://dysmsapi.aliyuncs.com/',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: param
        }, function (err, response, data) {
            if (callback) {
                callback(err, response, data);
            }
        });
    },

    /**
     * 短信接口签名算法函数
     * @param param 发送短信的参数
     * @param AccessKeySecret 阿里短信服务所用的密钥值
     */
    _signParameters: function (param, AccessKeySecret) {
        var param2 = {},
            data = [];

        var oa = Object.keys(param).sort();

        for (var i = 0; i < oa.length; i++) {
            var key = oa[i];
            param2[key] = param[key];
        }

        for (var key in param2) {
            data.push(encodeURIComponent(key) + '=' + encodeURIComponent(param2[key]));
        }

        data = data.join('&');
        var StringToSign = 'POST' + '&' + encodeURIComponent('/') + '&' + encodeURIComponent(data);
        AccessKeySecret = AccessKeySecret + '&';
        return crypto.createHmac('sha1', AccessKeySecret).update(new Buffer(StringToSign, 'utf-8')).digest('base64');
    },

    //发送注册短信[业务级]
    sendRegistSms: function () {
        var data = {
            PhoneNumbers: '1371673xxxx',	//要发送到短信的手机
            SignName: '短信签名',			//短信签名，阿里云短信平台申请
            TemplateCode: 'SMS_***',		//短信模板Code，阿里云短信平台申请
            TemplateParam: "{\"name\":\"用户A\",\"text\":\"3421\",\"time\":\"30\"}", //短信模板中参数指定，以你的为准替换之
            OutId: '1234'					//可选
        };
        this._sendMessage(data, function (err, response, data) {
            console.log(err, data);
        })
    },
    //发送用户修改密码短信[业务级]
    sendChangePwdSms: function () {

    },
};

module.exports = AliyunSmsUtil;

// 运行该阿里云短信发送函数之前，请做如下修改：
// 1. 请先修改 config 中的2个参数： AccessKeyId， AccessKeySecret
// 2. 修改业务级短信中相关参数，如sendRegistSms中data
AliyunSmsUtil.sendRegistSms();