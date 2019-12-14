<?php 
	header("Content-type:text/html;charset=utf-8");
	 var_dump ($_POST);
	
	/*
		取出post提交过来的数据
	*/
	$username = $_POST['username'];
	$password = $_POST['password'];
	$repassword = $_POST["repassword"];
	$createTime = $_POST["createTime"]; 
	/*
		注册
	*/
	$link = mysql_connect("localhost", "root", "123456");
	mysql_set_charset("utf8");

	mysql_select_db("qd1909");
	//准备sql语句  判断数据库是否有同名用户名
	$sql = "SELECT * FROM users WHERE username='{$username}'";
	$res = mysql_query($sql);
	$row = mysql_fetch_assoc($res);
	
	//密码要进行md5加密
	$str = md5(md5(md5($password)."qianfeng")."qingdao");

	//注册
	$sql = "INSERT INTO users(username,password,creat_time) VALUES('{$username}','{$str}',{$createTime})";
	
	$res = mysql_query($sql);
	mysql_close($link);
 ?>