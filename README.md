# Real-time chat using Angular , Spring-Boot & GCP

# Task
Build a helm chart from local development environment and migrate to GKE using cloud build*
-Dockerizing angular app, spring boot server, nginx reverse proxy server

-Trigger cloud build from cloud source repository to run CI/CD pipeline
-Automate docker image using cloud build
-Automate helm deployment using cloud build*


Created deployment.yaml file to provision
-Kubernetes ingress on GKE to serve angular and nginx reverse proxy backend
-Google Managed SSL Certificate for Kubernetes Ingress

Used APP_INTIALIZER in angular to set websocket url to backend service IP at runtime
Used GCP Secret manager to store docker credentials and authenticate to docker hub from cloud build environment
Integrate websocket into angular project using rxjs
Integrate messaging broker in angular using rx-stomp and stompjs

Deploy NGINX as a reverse proxy server to communicate to spring boot backend with WSS protocol without exposing public IP. 
Automate extraction of kubernetes service IP address to insert into nginx.conf for proxy_pass url during cloud build

Integrate kafka with spring-boot to serve as a database and scalable message-broker  

Used configmap in kubernetes to set application.yaml in spring boot at runtime
# Improvements
Implement security for spring-boot server instead of using reverse proxy

# To Do
Group chat
Video call
Sharing of video,images
Changing of profile picture
Recording of short voice messages
Sound notification
Tab notification title change
End to end encryption


# References
https://medium.com/johnjjung/how-to-use-gcp-loadbalancer-with-websockets-on-kubernetes-using-services-ingresses-and-backend-16a5565e4702
https://cloud.google.com/kubernetes-engine/docs/concepts/ingress-xlb#support_for_websocket
https://www.nginx.com/blog/websocket-nginx/
https://stackoverflow.com/questions/45079988/ingress-vs-load-balancer
https://github.com/stomp-js/ng2-stompjs/issues/129
https://cloud.google.com/build/docs/deploying-builds/deploy-gke#before_you_begin
https://stackoverflow.com/questions/53745789/how-to-configure-nginx-to-proxy-ws-websocket-protocol
https://www.thomasvitale.com/https-spring-boot-ssl-certificate/
https://www.youtube.com/watch?v=b-obZ8ZloIc&ab_channel=AyyazTech

# Problems faced
Handshake failed due to invalid Upgrade header in spring boot
Websocket (back end) > kafka producer (back end) > kafka consumer > websocket ((back end))
How to poll/read all messages from a topic