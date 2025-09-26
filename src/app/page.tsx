"use client";

import { useState } from "react";

type DnsProvider = "quad9" | "cloudflare" | "custom";
type DnsProtocol = "HTTPS" | "TLS";

interface CustomDnsConfig {
  prohibitDisablement: boolean;
  allowFailover: boolean;
  dnsProtocol: DnsProtocol;
  payloadCertificateUUID: string;
  serverAddresses: string;
  serverName: string;
  serverURL: string;
}

export default function Home() {
  const [provider, setProvider] = useState<DnsProvider>("quad9");
  const [customConfig, setCustomConfig] = useState<CustomDnsConfig>({
    prohibitDisablement: false,
    allowFailover: false,
    dnsProtocol: "HTTPS",
    payloadCertificateUUID: "",
    serverAddresses: "",
    serverName: "",
    serverURL: "",
  });

  const handleCustomConfigChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";
    const checked = (e.target as HTMLInputElement).checked;
    setCustomConfig((prev) => ({
      ...prev,
      [name]: isCheckbox ? checked : value,
    }));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">.mobileconfig Generator</h1>

      <div className="flex flex-wrap justify-center gap-8 mb-8">
        <div>
          <input
            type="radio"
            id="quad9"
            name="provider"
            value="quad9"
            checked={provider === "quad9"}
            onChange={() => setProvider("quad9")}
            className="mr-2"
          />
          <label htmlFor="quad9">Quad9</label>
        </div>
        <div>
          <input
            type="radio"
            id="cloudflare"
            name="provider"
            value="cloudflare"
            checked={provider === "cloudflare"}
            onChange={() => setProvider("cloudflare")}
            className="mr-2"
          />
          <label htmlFor="cloudflare">Cloudflare Security</label>
        </div>
        <div>
          <input
            type="radio"
            id="custom"
            name="provider"
            value="custom"
            checked={provider === "custom"}
            onChange={() => setProvider("custom")}
            className="mr-2"
          />
          <label htmlFor="custom">Custom</label>
        </div>
      </div>

      {provider === "custom" && (
        <form className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="dnsProtocol"
              >
                DNS Protocol (DNSProtocol)
              </label>
              <select
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="dnsProtocol"
                name="dnsProtocol"
                value={customConfig.dnsProtocol}
                onChange={handleCustomConfigChange}
              >
                <option>HTTPS</option>
                <option>TLS</option>
              </select>
            </div>

            {customConfig.dnsProtocol === "HTTPS" && (
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="serverURL"
                >
                  Server URL (ServerURL)
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="serverURL"
                  name="serverURL"
                  type="text"
                  placeholder="https://dns.example.com/dns-query"
                  value={customConfig.serverURL}
                  onChange={handleCustomConfigChange}
                />
              </div>
            )}

            {customConfig.dnsProtocol === "TLS" && (
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="serverName"
                >
                  Server Name (ServerName)
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="serverName"
                  name="serverName"
                  type="text"
                  placeholder="dns.example.com"
                  value={customConfig.serverName}
                  onChange={handleCustomConfigChange}
                />
              </div>
            )}

            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="serverAddresses"
              >
                Server Addresses (ServerAddresses)
              </label>
              <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="serverAddresses"
                name="serverAddresses"
                placeholder="1.1.1.1, 8.8.8.8, 2001:4860:4860::8888"
                value={customConfig.serverAddresses}
                onChange={handleCustomConfigChange}
              />
              <p className="text-gray-600 text-xs italic">
                Comma-separated list of IP addresses.
              </p>
            </div>

            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="payloadCertificateUUID"
              >
                Payload Certificate UUID (PayloadCertificateUUID)
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="payloadCertificateUUID"
                name="payloadCertificateUUID"
                type="text"
                placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
                value={customConfig.payloadCertificateUUID}
                onChange={handleCustomConfigChange}
              />
            </div>

            <div className="w-full px-3 flex items-center mb-4">
              <input
                className="mr-2 leading-tight"
                type="checkbox"
                id="allowFailover"
                name="allowFailover"
                checked={customConfig.allowFailover}
                onChange={handleCustomConfigChange}
              />
              <label
                className="text-sm"
                htmlFor="allowFailover"
              >
                Allow Failover to System DNS (AllowFailover)
              </label>
            </div>

            <div className="w-full px-3 flex items-center">
              <input
                className="mr-2 leading-tight"
                type="checkbox"
                id="prohibitDisablement"
                name="prohibitDisablement"
                checked={customConfig.prohibitDisablement}
                onChange={handleCustomConfigChange}
              />
              <label
                className="text-sm"
                htmlFor="prohibitDisablement"
              >
                Prohibit Disablement (ProhibitDisablement)
              </label>
            </div>

          </div>
        </form>
      )}

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8"
        onClick={handleSubmit}
      >
        Generate .mobileconfig
      </button>
    </main>
  );

  function handleSubmit() {
    let config: any;
    const displayName = "mobileconfig";

    switch (provider) {
      case "quad9":
        config = {
          DNSProtocol: "HTTPS",
          ServerURL: "https://dns11.quad9.net/dns-query",
          ServerAddresses: ["9.9.9.9", "149.112.112.112", "2620:fe::fe", "2620:fe::9"],
        };
        break;
      case "cloudflare":
        config = {
          DNSProtocol: "HTTPS",
          ServerURL: "https://security.cloudflare-dns.com/dns-query",
          ServerAddresses: ["1.1.1.2", "1.0.0.2", "2606:4700:4700::1112", "2606:4700:4700::1002"],
        };
        break;
      case "custom":
        const addresses = customConfig.serverAddresses.split(",").map((a) => a.trim()).filter(Boolean);
        const ipv4Regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
        const ipv6Regex = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/;

        const hasIPv4 = addresses.some(addr => ipv4Regex.test(addr));
        const hasIPv6 = addresses.some(addr => ipv6Regex.test(addr));

        if (!hasIPv4 || !hasIPv6) {
          alert("Custom configurations must include at least one IPv4 and one IPv6 address.");
          return;
        }

        config = {
          ...customConfig,
          ServerAddresses: addresses,
        };
        break;
    }

    const mobileConfig = generateMobileConfig(config, displayName);
    downloadMobileConfig(mobileConfig, `${displayName}.mobileconfig`);
  }
}

function generateMobileConfig(dnsSettings: any, displayName: string): string {
  const payloadUUID = crypto.randomUUID();
  const payloadIdentifier = `com.apple.dnsSettings.managed.${payloadUUID}`;
  const profileUUID = crypto.randomUUID();
  const profileIdentifier = `com.example.mobileconfig.${profileUUID}`;

  let dnsSettingsDict = Object.entries(dnsSettings)
    .map(([key, value]) => {
      if (key === 'ServerAddresses' && Array.isArray(value)) {
        return `<key>${key}</key><array>${value.map(v => `<string>${v}</string>`).join('')}</array>`;
      }
      if (typeof value === 'boolean') {
        return `<key>${key}</key><${value}/>`;
      }
      if (typeof value === 'string' && value) {
        return `<key>${key}</key><string>${value}</string>`;
      }
      return '';
    })
    .filter(Boolean)
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PayloadContent</key>
    <array>
        <dict>
            <key>DNSSettings</key>
            <dict>
                ${dnsSettingsDict}
            </dict>
            <key>PayloadDisplayName</key>
            <string>DNS Settings</string>
            <key>PayloadIdentifier</key>
            <string>${payloadIdentifier}</string>
            <key>PayloadType</key>
            <string>com.apple.dnsSettings.managed</string>
            <key>PayloadUUID</key>
            <string>${payloadUUID}</string>
            <key>PayloadVersion</key>
            <integer>1</integer>
        </dict>
    </array>
    <key>PayloadDisplayName</key>
    <string>${displayName}</string>
    <key>PayloadIdentifier</key>
    <string>${profileIdentifier}</string>
    <key>PayloadType</key>
    <string>Configuration</string>
    <key>PayloadUUID</key>
    <string>${profileUUID}</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
</dict>
</plist>`;
}

function downloadMobileConfig(content: string, fileName: string) {
  const blob = new Blob([content], { type: "application/x-apple-aspen-config" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
