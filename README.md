# WhatsappClone

# Uses Ingress to deploy SSL HTTPS Load balancer

# Task
Setup NGINX conf to redirect http to https 
Setup deployment yaml to create google managed ssl certificate and ingress
Use APP_INTIALIZER TO set environment variable at runtime 
Callback error after sockjs disconnected , heartbeat not consistent , cyclic dependency error
Use rx-stomp instead of sockjs , same for spring boot server strictly websocket only
Deploy nginx reverse proxy to communicate with unsecure ws backend. Other alternative is to secure your spring boot
Unable to set ingress link in nginx con because it will still try to connect ws securely

# References
https://medium.com/johnjjung/how-to-use-gcp-loadbalancer-with-websockets-on-kubernetes-using-services-ingresses-and-backend-16a5565e4702
https://cloud.google.com/kubernetes-engine/docs/concepts/ingress-xlb#support_for_websocket
https://www.nginx.com/blog/websocket-nginx/
https://stackoverflow.com/questions/45079988/ingress-vs-load-balancer
https://github.com/stomp-js/ng2-stompjs/issues/129
https://cloud.google.com/build/docs/deploying-builds/deploy-gke#before_you_begin
https://stackoverflow.com/questions/53745789/how-to-configure-nginx-to-proxy-ws-websocket-protocol
https://www.thomasvitale.com/https-spring-boot-ssl-certificate/