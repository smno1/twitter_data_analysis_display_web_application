Team9
=========
# Ansible Instructions
# In order to make ansible flexible and reusable, the yml files are further divided into sub yml files, roles are also       
# employed to enhance the flexibility and reusability which include updatecache, commonsoftware, couchdb,                    
# mountvolume,uploadfile,runharvester,webrelatedpackage,startwebserver.
# The following instructions can be used to exetcue the Ansible files to achieve an automatic deployment:

master.yml                # master playbook
runboto.yml               # playbook for runboto
webservers.yml            # playbook for webservers 
cloudservers.yml          # playbook for cloudservers 

#Run everything :
`ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -i hosts master.yml`

#Run boto setup only :
`ansible-playbook -i hosts runboto.yml`

#Run cloud services only:
`ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -i hosts cloudservers.yml`

#Run web services only:
`ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -i hosts webservers.yml`

#creating new roles:
`ansible-galaxy init rolename`

# Boto instructions for running boto individually
# Boto is used to creat instances and attach volumes
# how to run boto
`python boto.py`

