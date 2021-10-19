#!/bin/bash
set -x #echo onnano

#echo "hello"
#" $temp
#sed -i "s/clusterip/$temp/" ./configmap.yaml

#SPRING_CONFIG_LOCATION=`echo $PWD"/configmap.yaml"`

kubectl apply -f ./deployment.yaml
kubectl rollout restart deployment/angular