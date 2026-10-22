
variable "aws_region" {
  description = "AWS region for the serverless deployment"
  type        = string
  default     = "ap-south-1"
}

variable "project_name" {
  description = "Unique name for the Lambda function"
  type        = string
  default     = "react-admin-dashboard-api-vanshika"
}
