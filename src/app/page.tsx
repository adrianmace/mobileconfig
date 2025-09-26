"use client";

import { useState, useEffect } from "react";

type DnsProvider = "quad9" | "cloudflare" | "custom";
type DnsProtocol = "HTTPS" | "TLS";

interface DnsConfig {
  name: string;
  DNSProtocol: DnsProtocol;
  ServerAddresses: string[];
  ServerName: string;
  ServerURL: string;
}

const quad9Config: DnsConfig = {
  name: "Quad9",
  DNSProtocol: "HTTPS",
  ServerURL: "https://dns.quad9.net/dns-query",
  ServerAddresses: ["9.9.9.9", "149.112.112.112", "2620:fe::fe", "2620:fe::9"],
  ServerName: "",
};

const cloudflareConfig: DnsConfig = {
  name: "Cloudflare",
  DNSProtocol: "HTTPS",
  ServerURL: "https://security.cloudflare-dns.com/dns-query",
  ServerAddresses: ["1.1.1.2", "1.0.0.2", "2606:4700:4700::1112", "2606:4700:4700::1002"],
  ServerName: "",
};

export default function Home() {
  const [provider, setProvider] = useState<DnsProvider>("quad9");
  const [customConfig, setCustomConfig] = useState<DnsConfig>({
    name: "",
    DNSProtocol: "HTTPS",
    ServerAddresses: ["", "", "", ""],
    ServerName: "",
    ServerURL: "",
  });

  const [displayedConfig, setDisplayedConfig] = useState<DnsConfig>(quad9Config);

  useEffect(() => {
    if (provider === "quad9") {
      setDisplayedConfig(quad9Config);
    } else if (provider === "cloudflare") {
      setDisplayedConfig(cloudflareConfig);
    } else {
      setDisplayedConfig(customConfig);
    }
  }, [provider, customConfig]);

  const isCustom = provider === 'custom';

  const handleCustomConfigChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!isCustom) return;
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";
    const checked = (e.target as HTMLInputElement).checked;
    setCustomConfig((prev) => ({
      ...prev,
      [name]: isCheckbox ? checked : value,
    }));
  };

  const handleServerAddressChange = (index: number, value: string) => {
    if (!isCustom) return;
    const newAddresses = [...customConfig.ServerAddresses];
    newAddresses[index] = value;
    setCustomConfig((prev) => ({
      ...prev,
      ServerAddresses: newAddresses,
    }));
  };

  const addServerAddress = () => {
    if (!isCustom) return;
    setCustomConfig((prev) => ({
      ...prev,
      ServerAddresses: [...prev.ServerAddresses, ""],
    }));
  };

  const removeServerAddress = (index: number) => {
    if (!isCustom) return;
    const newAddresses = [...customConfig.ServerAddresses];
    newAddresses.splice(index, 1);
    setCustomConfig((prev) => ({
      ...prev,
      ServerAddresses: newAddresses,
    }));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4 text-center">DoH / DoT MobileConfig Generator</h1>
      <p className="text-lg text-center mb-8">Generate .mobileconfig files for DNS-over-HTTPS and DNS-over-TLS settings on Apple Devices.</p>

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

      <form className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="name"
              name="name"
              type="text"
              placeholder="My Custom DNS"
              value={displayedConfig.name}
              onChange={handleCustomConfigChange}
              readOnly={!isCustom}
            />
          </div>

          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="DNSProtocol"
            >
              DNS Protocol (DNSProtocol)
            </label>
            <select
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="DNSProtocol"
              name="DNSProtocol"
              value={displayedConfig.DNSProtocol}
              onChange={handleCustomConfigChange}
              disabled={!isCustom}
            >
              <option>HTTPS</option>
              <option>TLS</option>
            </select>
          </div>

          {displayedConfig.DNSProtocol === "HTTPS" && (
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="ServerURL"
              >
                Server URL (ServerURL)
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="ServerURL"
                name="ServerURL"
                type="text"
                placeholder="https://dns.example.com/dns-query"
                value={displayedConfig.ServerURL}
                onChange={handleCustomConfigChange}
                readOnly={!isCustom}
              />
            </div>
          )}

          {displayedConfig.DNSProtocol === "TLS" && (
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="ServerName"
              >
                Server Name (ServerName)
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="ServerName"
                name="ServerName"
                type="text"
                placeholder="dns.example.com"
                value={displayedConfig.ServerName}
                onChange={handleCustomConfigChange}
                readOnly={!isCustom}
              />
            </div>
          )}

          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Server Addresses (ServerAddresses)
            </label>
            {displayedConfig.ServerAddresses.map((address, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder={index < 2 ? "203.0.113.1" : "2001:db8::1"}
                  value={address}
                  onChange={(e) => handleServerAddressChange(index, e.target.value)}
                  readOnly={!isCustom}
                />
                {isCustom && (
                  <button
                    type="button"
                    onClick={() => removeServerAddress(index)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded ml-2"
                    disabled={customConfig.ServerAddresses.length === 1}
                  >
                    -
                  </button>
                )}
              </div>
            ))}
            {isCustom && (
              <button
                type="button"
                onClick={addServerAddress}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                +
              </button>
            )}
          </div>
        </div>
      </form>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8"
        onClick={handleSubmit}
      >
        Generate .mobileconfig
      </button>

      <footer className="mt-8 text-center text-sm text-gray-500">
        Developed by{" "}
        <a
          href="https://adrian.mace.au"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Adrian Mace
        </a>{" "}
        using agentic AI.
      </footer>
    </main>
  );

  async function handleSubmit() {
    let config: DnsConfig;

    if (provider === 'custom') {
      const addresses = customConfig.ServerAddresses.map((a) => a.trim()).filter(Boolean);
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
    } else {
      config = displayedConfig;
    }

    const mobileConfig = await generateMobileConfig(config, provider);
    const name = config.name || 'custom';
    downloadMobileConfig(mobileConfig, `${name.toLowerCase().replace(/\s/g, '-')}.mobileconfig`);
  }
}

async function generateUUID(name: string) {
  const namespace = "91937497-7597-4598-8454-6019558546E6";
  const encoder = new TextEncoder();
  const data = encoder.encode(namespace + name);
  const hash = await crypto.subtle.digest('SHA-1', data);
  const bytes = Array.from(new Uint8Array(hash));

  bytes[6] = (bytes[6] & 0x0f) | 0x50;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hexBytes = bytes.map(b => b.toString(16).padStart(2, '0'));

  return [
    hexBytes.slice(0, 4).join(''),
    hexBytes.slice(4, 6).join(''),
    hexBytes.slice(6, 8).join(''),
    hexBytes.slice(8, 10).join(''),
    hexBytes.slice(10, 16).join(''),
  ].join('-').toUpperCase();
}

async function generateMobileConfig(dnsSettings: DnsConfig, provider: DnsProvider): Promise<string> {
  const { name, DNSProtocol } = dnsSettings;
  const profileUUID = await generateUUID(name);
  const payloadUUID = await generateUUID(name + "-payload");
  const certUUID = await generateUUID(name + "-cert");

  const payloadIdentifier = `au.mace.adrian.dns.${payloadUUID}`;
  const profileIdentifier = `au.mace.adrian.dns.${profileUUID}`;

  const payloadDisplayName = `${DNSProtocol === 'HTTPS' ? 'DoH' : 'DoT'} via ${name}`;
  const payloadDescription = `Configures your device to use ${name} via ${DNSProtocol === 'HTTPS' ? 'DoH' : 'DoT'}.`;

  const finalDnsSettings: any = { ...dnsSettings, ProhibitDisablement: false };
  if (provider === 'custom') {
    finalDnsSettings.PayloadCertificateUUID = certUUID;
  }

  let dnsSettingsDict = Object.entries(finalDnsSettings)
    .map(([key, value]) => {
      if (key === 'name') return '';
      if (key === 'ServerAddresses' && Array.isArray(value)) {
        return `<key>${key}</key><array>${value.map(v => `<string>${v}</string>`).join('')}</array>`;
      }
      if (typeof value === 'boolean') {
        return `<key>${key}</key><${value} />`;
      }
      if (typeof value === 'string' && value) {
        return `<key>${key}</key><string>${value}</string>`;
      }
      return '';
    })
    .filter(Boolean)
    .join('\n');

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
            <string>${payloadDisplayName}</string>
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
    <string>${payloadDisplayName}</string>
    <key>PayloadDescription</key>
    <string>${payloadDescription}</string>
    <key>PayloadOrganization</key>
    <string>adrian.mace.au</string>
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
