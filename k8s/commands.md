```bash
brew install minikube

miniKube start
minikube ip
miniKube dashboard
minikube service popular-repos-search --namespace=popular-repos-search-test

type - pods, service, ingress, deployments, namepaces, svc
kubectl --help
kubectl apply -f popular-repos-search.yaml
kubectl logs -f <pod>
kubectl get <type> < -o wide >
kubectl get all
kubectl delete <type> <name>
kubectl describe pods
kubectl exec -it <pod> --namespace=popular-repos-search-test -- sh

kubectl create deployment popular-repos-search-depl --image=maxwellenemuo/popular-repos-search
```

- Reference - https://kubernetes.io/docs/reference/kubernetes-api/
