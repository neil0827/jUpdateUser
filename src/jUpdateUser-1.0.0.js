;(function($){
	var Plugin = function(ele, opt){
		this.$element = ele;
		this.defaults = {
			userId:"",
			dataUrl:"",
			submitUrl:"",
			close:function(){
				
			},
			cancel:function(){
				
			},
			ok:function(params){
				$.post(this.submitUrl,params,null,"json").done(function(data){
					if(data.code==1)
						window.alert("success");
					else
						window.alert("fail");
				});
			}
		};
		this.options = $.extend({},this.defaults,opt);
		this.data = {
			loginName:"",
			clientName:"",
			gender:"",
			idNumber:"",
			idLocation:"",
			mobilePhone:"",
			email:"",
			officePhone:"",
			postCode:"",
			address:""
		};
	};
	
	Plugin.prototype = {
		init:function(){
			this.initData();
		},
		initData:function(){
			that = this;
			$.get(this.options.dataUrl,{userId:this.options.userId},null,"json").done(function(d){
				$.extend(that.data,d);
				that.createContentHtml();
			});
		},
		createContentHtml:function(){
			var that = this;
			
			var $context = $("<div id='jUpdateUser-context'></div>");
			$context.append("<div class='jUpdateUser-background'></div>");
			
			var $header = $("<div class='jUpdateUser-header'></div>");
			var $closeBtn = $("<button class='closeBtn' title='关闭'>×</button>").on("click",function(){
				$("#jUpdateUser-context").remove();
				that.options.close();
			});
			$header.append($closeBtn);
			$header.append("<div class='title'><span>注册用户详情</span></div>");
			
			var $body = $("<div class='jUpdateUser-body'></div>");
			var $block = $("<div class='rflist' style='padding-left:20px;'></div>");
			var $table1 = $("<table width='100%' border='0' cellpadding='0' cellspacing='1' class='noeditinfo'></table>");
			$table1.append("<tbody><tr><td colspan='2'><label> 用户名：</label><span id='loginName'>"+this.data.loginName+"</span></td></tr><tr><td><label> 客户姓名：</label><span id='clientName'>"+this.data.clientName+"</span></td><td><label> 性别：</label> <span id='gender'>"+this.data.gender+"</span></td></tr></tbody>");
			
			var $table2 = $("<table width='100%' border='0' cellpadding='0' cellspacing='0' class='MemberPageClientInfo'></table>");
			var $tbody2 = $("<tbody></tbody>");
			$tbody2.append("<tr><td class='tit'><label> <em style='color:red;'>*</em>身份证号码：</label></td><td class='input'><input name='idNumber' id='idNumber' type='text' value='"+this.data.idNumber+"'/></td><td class='msg'><i id='idNumber_i' class='icon-ok'></i><span id='idNumber_span'>长度为15或者18位,年龄必须在18岁到60岁之间</span></td></tr>");
			$tbody2.append("<tr><td class='tit'>客户所在地：</td><td class='input'><input name='idLocation' type='text' value='"+this.data.idLocation+"' maxlength='50' id='idLocation' alt='^.{0,50}$'></td><td class='msg'><i id='idLocation_i' class=''></i></td></tr>");
			$tbody2.append("<tr><td class='tit'><em style='color:Red;'>*</em>手机号码：</td><td class='input'><input name='mobilePhone' type='text' value='"+this.data.mobilePhone+"'></td><td class='msg'><i id='mobilePhone_i' class='icon-ok'></i><span>必须全部为数字并且长度为11位</span></td></tr>");
			$tbody2.append("<tr><td class='tit'><em style='color:Red;'>*</em>联系邮箱：</td><td class='input'><input name='email' type='text' value='"+this.data.email+"' maxlength='50' id='email'></td><td class='msg'><i id='email_i' class='icon-ok'></i><span>举例：example@abc.com</span></td></tr>");
			$tbody2.append("<tr><td class='tit'>固定电话：</td><td class='input'><input name='officePhone' type='text' value='"+this.data.officePhone+"' maxlength='20' id='officePhone'></td><td class='msg'><i id='officePhone_i' class=''></i>区号(2位到5位)-电话号码(4位到10位)</td></tr>");
			$tbody2.append("<tr><td class='tit'>邮政编码：</td><td class='input'><input name='postCode' type='text' maxlength='8' value='"+this.data.postCode+"' id='postCode'></td><td class='msg'></td></tr>");
			$tbody2.append("<tr><td class='tit'>通讯地址：</td><td class='input'><input name='address' type='text' maxlength='50' id='address' value='"+this.data.address+"'></td><td class='msg'></td></tr>");
			$table2.append($tbody2);
			$block.append($table1);
			$block.append($table2);
			$body.append($block);
			
			var $foot = $("<div class='jUpdateUser-foot'></div>");
			var $cancelBtn = $("<button class='btn cancel'>取消</button>").on("click",function(){
				$("#jUpdateUser-context").remove();
				that.options.cancel();
			});
			var $okBtn = $("<button class='btn ok'>确定</button>").on("click",function(){
				var loginName = $("#loginName").html();
				var clientName = $("#clientName").html();
				var gender = $("#gender").html();
				var idNumber = $("#idNumber").val();
				var idLocation = $("#idLocation").val();
				var mobilePhone = $("#mobilePhone").val();
				var email = $("#email").val();
				var officePhone = $("#officePhone").val();
				var postCode = $("#postCode").val();
				var address = $("#address").val();
				$("#jUpdateUser-context").remove();
				
				var args = {
					loginName:loginName,
					clientName:clientName,
					gender:gender,
					idNumber:idNumber,
					idLocation:idLocation,
					mobilePhone:mobilePhone,
					email:email,
					officePhone:officePhone,
					postCode:postCode,
					address:address
				};
				that.options.ok(args);
			});
			$foot.append($cancelBtn);
			$foot.append($okBtn);
			
			$main = $("<div class='jUpdateUser-main'></div>");
			$main.append($header);
			$main.append($body);
			$main.append($foot);
			
			$content = $("<div class='jUpdateUser-content'></div>");
			$content.append($main);
			$context.append($content);
			$("body").append($context);
		}
	};
	
	$.extend($,{
		jUpdateUser:function(options){
			var plugin = new Plugin(this,options);
			return plugin.init();
		}
	});
})(jQuery);