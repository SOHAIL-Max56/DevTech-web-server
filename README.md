

## Deployment in AWs
`
To deploy the application in AWS, you can follow these steps:

1. **Set Up AWS Account**: If you don't have an AWS account, create one at [AWS](https://aws.amazon.com/).
2. **Create an EC2 Instance**: Go to the EC2 dashboard and launch a new instance. Choose an appropriate Amazon Machine Image (AMI) and instance type based on your requirements.
3. **Configure Security Group**: Set up a security group to allow inbound traffic on the necessary ports (e.g., HTTP port 80, HTTPS port 443, and any other ports your application requires).
4. **Connect to the Instance**: Use SSH to connect to your EC2 instance. You can find the connection details in the EC2 dashboard.
5. **Install Required Software**: Install any necessary software on the instance, such as a web server (e.g., Apache, Nginx) and any dependencies your application requires.
6. **Deploy Your Application**: Upload your application files to the EC2 instance. You can use SCP, SFTP, or any other file transfer method.
7. **Configure the Web Server**: Set up your web server to serve your application. This may involve creating a virtual host configuration and pointing it to your application directory.

   ### For Frontend

   - If you are using a frontend framework (e.g., React, Angular, Vue), you can build the production version of your frontend and serve it using a web server like Nginx.
   - `npm install` to install dependencies.
   - `npm run build` to create a production build of your frontend application.
   - `sudo apt update` to update the package list.
   - `sudo apt install nginx` to install Nginx.
   - `sudo systemctl start nginx` to start the Nginx service.
   - `sudo systemctl enable nginx` to enable Nginx to start on boot.
   - `sudo scp -r dist/* /var/www/html/` to copy the built frontend files to the Nginx web root directory.

   ### For Backend

    - update the package list and install necessary dependencies (e.g., Node.js, npm).
    - `npm install` to install backend dependencies.
    - `npm install pm2 -g` to install PM2 globally for process management.
    - `pm2 start npm -- start` to start your backend application using PM2.
      - `pm2 save` to save the PM2 process list and ensure it restarts on server reboot.
      - `pm2 startup` to generate a startup script for PM2.
      - `pm2 list` to verify that your application is running.
      - `pm2 logs` to view the logs of your application.
      - `pm2 stop <app_name>` to stop your application if needed.
      - `pm2 restart <app_name>` to restart your application if needed.
      - `pm2 delete <app_name>` to delete your application from PM2 if needed.
      - `pm2 start npm --name "backend" -- start` to start your backend application with a specific name in PM2.

      ### Configure Domain and SSL (Optional)

      - Frontend : http://98.130.129.15/
      - Backend : http://98.130.129.15/api
      