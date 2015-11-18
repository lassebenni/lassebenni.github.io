---
layout: post
title: "Windows staggering to a halt? Read this one amazing tip that will change your life!...: Basically just disable Microsoft Security Essentials"
tags: [Msmpeng.exe, Microsoft Security, Essentials]
comments: true
---

Alright, thanks for joining us today and the whole shabam. I have noticed that my laptop would occasionally grind to unmanageably slow speeds, with processor usage shooting throught the roof. I have a i5 quadcore processor in this machine, which is certainly not the beefiest CPU, but it should hold up against some basic surfing and working in MS Office while listening to Spotify. What I have found is that the process Msmpeng.exe, a Microsoft Security Essentials anti-malware application included in Windows 7, was hogging up a lot of resources. As I have a trusted third party protection suite: Avira Antivirus, I don't think its necessary to endure the cost of "additional" protection. In life I have learned that its not wise to mix different types of alcohol or antivirus programs. Anyway, by 
shutting off Microsoft Security Essentials I noticed a difference in speed right away. I also did this on an older machine with only 2gbs of ram, this changed the machine from being unoperable to a decent performance.

<br>

>![Task Manager](https://www.htmlvalidator.com/png/2010build/200912taskmanager2.png)
After inspecting the Performance Usage in Windows by going to Task Manager (Ctrl + Shift + Escape, hotkey to open Task Manager). Click on the Resource Manager button at the bottom to further inspect usage of processes on your computer.

<br>

>![Resource Manager](http://i.stack.imgur.com/kY8LN.png)
Select the CPU tab. If you  see Msmpeng.exe in the top of the list you might have found the problem.

<br>

## How to limit Msmpeng.exe's resource hogging 

When monitoring the Msmpeng.exe process in Resource Monitor I noticed a steady increase in Msmpeng.exe's CPU power usage when starting a new non-Microsoft application (for instance Codeblocks, a C editor). It seems to be scanning the programs you open, every single time (source?), however this is just an uneducated guess. What I _can_ tell you is that it takes longer to start a program when Microsoft Security Essentials is turned on. Now, enough with the chit-chat and let's turn this damn thing off:

#### First make sure you have third-party anti-virussoftware installed or ready to be installed (I use the excellent Avast Antivirus suite)! As the protection will be lost immediatly by turning off real-time protection in Microsoft Security Essentials.

1. Start -> Run.
2. Type "essentials".
3. Choose the Microsoft Security Essentials application.
4. Go to the "Settings" tab.
5. Select the "Real-time protection" option at the left.
6. Remove the check mark for Real-time protection.
7. Select "Save changes" at the bottom.
8. Done.

<br>

>![Real-time protection](http://www.pcwintips.com/wp-content/uploads/2014/04/turn-off-real-time-protection-MSE.png)
Turning off the real-time protection.

Now if you return to the Resource Manager you should notice that the Msmpeng.exe process has significantly dropped in the list and the difference should be noticable in running your programs too!

>![Real-time protection](/images/windows-staggering/resources-after.jpg)
Look at that Msmpeng.exe just relaxing in resource mode.

As I stated before: you should only do this once you have another antivirus and/or anti-malware program installed. You wouldn't tear off your childs ragged jacket and send him off into the cold without giving him a new one! Look at that analogy and tell me that doesn't make sense!

Peace, love and happiness,
Lasse