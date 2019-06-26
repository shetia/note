## jq 表单提交
``` html
    <form action="" id="consult_form">
        <div class="more_selection">
            <div>
                <input type="radio" id='company' name="consult" value="company" />
                <label for="company">企业主</label>
            </div>

            <div>
                <input type="radio" id='agent' name="consult" value="agent" />
                <label for="agent">代理商</label>
            </div>

            <div>
                <input type="radio" id='advert' name="consult" value="advert" />
                <label for="advert">广告主</label>
            </div>

            <div>
                <input type="radio" id='terminal' name="consult" value="terminal" />
                <label for="terminal">终端渠道商</label>
            </div>
            </div>
            <div class="more_input">
                <input type="text" name="companyName" placeholder="企业名称">
                <input type="text" name="name" placeholder="姓名">
                <input type="text" name="phone" placeholder="手机">
                <input type="text" name="email" placeholder="邮箱">
            </div>
        <div>
            <span class="more_submit_btn">确认提交</span>
        </div>
    </form>
```
    > 如果要表单元素的值包含到序列字符串中，元素必须使用 name 属性。
``` js
    // // 点击提交
    $('.more_submit_btn').on('click', function () {

    console.log($("form").serialize())
    console.log($("form").serializeArray())
    })


    $.ajax({
        type: "POST",
        dataType: "json",
        url:ajaxCallBack,
        data:$('#myForm').serialize(),// 要提交表单的ID
        success: function(msg){
            alert(msg);
        }
    });
```