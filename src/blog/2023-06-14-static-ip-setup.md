---
title: 'Setting Up Static IP in Ubuntu'
tags:
    - 'ubuntu'
    - 'server'
    - 'homelab'
description: 'How to setup Static IP in Ubuntu.'
---

## {% title "Determining Network Interface Card (NIC) name" %}
```bash
sudo lshw -c network
```
Under the `Ethernet Interface` copy the `logical name`.

## {% title "Finding Netmask" %}
```bash
ip a
```
Against the NIC name you should see a sequence of the format `XXX.XXX.XXX.XXX/YY`.

Where `XXX.XXX.XXX.XXX` is the dynamically assigned IP address and `YY` is the Netmask. Copy the Netmask.

## {% title "Finding Default Gateway" %}
```bash
ip r | grep 'default'
```
Copy the sequence of the format `ZZZ.ZZZ.ZZZ.ZZZ` which is the Default Gateway.

## {% title "Creating Configuration File" %}
```bash
cd /etc/netplan
```
If you already have a file similar to `00-installer-config.yaml` modify it else create one.

```yaml
network:
  version: 2
  ethernets:
    <name>:
      dhcp4: false
      addresses:
        - XXX.XXX.XXX.XXX/YY
      routes:
        - to: default
          via: ZZZ.ZZZ.ZZZ.ZZZ
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]
```
where,
* `<name>` is your NIC name
* `XXX.XXX.XXX.XXX` is your Static IP 
* `YY` is your Netmask
* `ZZZ.ZZZ.ZZZ.ZZZ` is your Default Gateway

## {% title "Testing and Applying Changes" %}
```bash
sudo netplan try
```
If there are no errors press `Enter` to apply the changes.
