# mobileconfig

This is a website that allows the user to quickly and easily generate .mobileconfig files for configuring DNS-over-HTTPS or DNS-over-TLS settings on Apple Devices.

# Functionality
- The user can select radio buttons for Quad9, Cloudflare Security (1.1.1.2), or Custom.
- If the user selects Custom, a form appears where the user can specify values for each of the options found in the [DNSSettings](https://developer.apple.com/documentation/devicemanagement/dnssettings) object.
- When the form is submitted, a `.mobileconfig` file is downloaded to their device.
- The `.mobileconfig` file is unsigned.
- The `.mobileconfig` configurations always include IPv6 addresses as well as IPv4 addresses.

# Technical Stack
- This site is written with NextJS and deployed to GitHub Pages via GitHub Actions.
- This codebase adheres to all current best practices for the respective technologies and languages in use.
- Software dependencies are kept up-to-date with Renovate.
