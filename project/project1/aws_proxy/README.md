This folder is used to setup a AWS proxy for REST API calls that bypasses CORS when opening HTML files through a local system instead of a virtual, hosted environment.

## Instructions
- Import API Gateway from `project1\aws_proxy\iste340_cors_proxy-iste340-oas30-apigateway.yaml`
- Create a lambda and create a trigger to the API Gateway
    - Node.js environment: nodejs20.x
    - Architecture: x86_64
    - Deployment stage "iste340"
    - Security: Open
- Deploy lambda and API gateway stage

## Alternative to AWS CORS Proxy
- Use a public CORS Proxy