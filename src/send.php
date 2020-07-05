<?php
	if(isset($_POST['submit'])){

		$name = $_POST['name'];
		$email = $_POST['email'];
		$subject = $_POST['subject'];
		$message = $_POST['message'];
		$to = 'stevencharles1325@gmail.com';

		mail($to, $subject, $message, $email)
			
	}


?>
