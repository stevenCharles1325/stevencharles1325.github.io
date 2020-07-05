<?php
	if(isset($_POST['submit'])){

		$name = $_POST['name'];
		$email = $_POST['email'];
		$subject = $_POST['subject'];
		$message = $_POST['message'];
		$to = 'stevencharles1325@gmail.com';

		if(mail($to, $subject, $message, $email)){
			echo "<script type="text/javascript"> alert('successful')</script>";
		}
		else
		{
			echo "<script type="text/javascript"> alert('Something went wrong...')</script>";
		}
			
	}


?>
