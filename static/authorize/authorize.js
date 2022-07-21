var xhr = new XMLHttpRequest() //这里没有考虑IE浏览器，如果需要择if判断加
xhr.open(
  "GET",
  "http://127.0.0.1:4523/m1/1109183-0-default/authorize/options",
  true
)
xhr.send(JSON.stringify(null)) //这里要是没有参数传，就写null
xhr.onreadystatechange = function () {
  if (xhr.status === 200 && xhr.readyState === 4) {
    var result = JSON.parse(xhr.response)
    console.info(result)
    for (var i = 0; i < result.data.length; i++) {
      $("#brandData").append(
        "<label>" +
          "<input name='items' type='checkbox' value=" +
          result.data[i].key +
          ">" +
          result.data[i].value +
          "</label>"
      )
    }
  }
}
function btnAction() {
  var boxes = document.getElementsByTagName("input")
  var val = []
  for (i = 0; i < boxes.length; i++) {
    if (boxes[i].checked == true) {
      val.push(boxes[i].value)
    }
  }
  console.info(val)
  var httpRequest = new XMLHttpRequest() //第一步：创建需要的对象
  httpRequest.open("POST", "http://httpbin.org/post", true) //第二步：打开连接/***发送json格式文件必须设置请求头 ；如下 - */
  httpRequest.setRequestHeader("Content-type", "application/json") //设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）var obj = { name: 'zhansgan', age: 18 };
  httpRequest.send(JSON.stringify(val)) //发送请求 将json写入send中
  /**
   * 获取数据后的处理程序
   */
  httpRequest.onreadystatechange = function () {
    //请求后的回调接口，可将请求成功后要执行的程序写在其中
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      //验证请求是否发送成功
      var json = httpRequest.responseText //获取到服务端返回的数据
      console.log(json)
    }
  }
}
