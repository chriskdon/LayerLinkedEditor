# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
	# Box
	config.vm.box = "precise32"
	config.vm.box_url = "http://files.vagrantup.com/precise32.box"

	config.vm.network :forwarded_port, guest: 8080, host: 8080
	config.vm.network :forwarded_port, guest: 9000, host: 9000

	# INSTALL
	#config.vm.provision :shell, :path => "setup.sh"

	# RUN
	config.vm.provision :shell, :path => "bootstrap.sh"
end
