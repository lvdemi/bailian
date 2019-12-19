<?php
    header("Content-type:text/html;charset=utf-8");
    /*
		取出post提交过来的数据
    */
    $responseData = array("code" => 0, "message" => "");
	$username = $_POST['username'];
	$password = $_POST['password'];
	/*
		简单的验证
    */
    if(!$username){
		$responseData["code"] = 1;
		$responseData["message"] = "用户名不能为空";
		echo json_encode($responseData);
		exit;
	}
	if(!$password){
		$responseData["code"] = 2;
		$responseData["message"] = "密码不能为空";
		echo json_encode($responseData);
		exit;
    }
    	/*
		登入
	*/
	$link = mysql_connect("localhost", "root", "123456");
	if(!$link){
		$responseData["code"] = 3;
		$responseData["message"] = "服务器有点忙";
		echo json_encode($responseData);
		exit;
	}
	mysql_set_charset("utf8");

    mysql_select_db("qd1909");
    //密码要进行md5加密
    $str = md5(md5(md5($password)."qianfeng")."qingdao");
    
    $sql = "SELECT * FROM users WHERE username ='{$username}' AND password = '{$str}'";
    
    $res = mysql_query($sql);
    $row = mysql_fetch_assoc($res);
    if(!$row){
        $responseData["code"] = 4;
        $responseData["message"] = "用户名或密码错误";
        echo json_encode($responseData);
        exit;
    }else{
        $responseData["message"] = '登入成功';
        echo json_encode($responseData);
    }
    mysql_close($link);
?>