import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LocalizationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Localization Settings
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Configure language and regional preferences
        </p>
      </div>

      {/* Language */}
      <Card>
        <CardHeader>
          <CardTitle>Language</CardTitle>
          <CardDescription>
            Select your preferred language
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language">Interface Language</Label>
            <Select defaultValue="en-us">
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-us">English (US)</SelectItem>
                <SelectItem value="en-gb">English (UK)</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="it">Italiano</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="zh-cn">简体中文</SelectItem>
                <SelectItem value="zh-tw">繁體中文</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
                <SelectItem value="ko">한국어</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Regional Format */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Format</CardTitle>
          <CardDescription>
            Configure number, currency, and measurement formats
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="region">Region</Label>
            <Select defaultValue="us">
              <SelectTrigger id="region">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="eu">European Union</SelectItem>
                <SelectItem value="jp">Japan</SelectItem>
                <SelectItem value="cn">China</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="number-format">Number Format</Label>
            <Select defaultValue="1234.56">
              <SelectTrigger id="number-format">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1234.56">1,234.56 (US)</SelectItem>
                <SelectItem value="1234,56">1.234,56 (EU)</SelectItem>
                <SelectItem value="1 234,56">1 234,56 (FR)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Currency */}
      <Card>
        <CardHeader>
          <CardTitle>Currency</CardTitle>
          <CardDescription>
            Set your preferred currency
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currency">Default Currency</Label>
            <Select defaultValue="usd">
              <SelectTrigger id="currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD - US Dollar ($)</SelectItem>
                <SelectItem value="eur">EUR - Euro (€)</SelectItem>
                <SelectItem value="gbp">GBP - British Pound (£)</SelectItem>
                <SelectItem value="jpy">JPY - Japanese Yen (¥)</SelectItem>
                <SelectItem value="cny">CNY - Chinese Yuan (¥)</SelectItem>
                <SelectItem value="aud">AUD - Australian Dollar (A$)</SelectItem>
                <SelectItem value="cad">CAD - Canadian Dollar (C$)</SelectItem>
                <SelectItem value="chf">CHF - Swiss Franc (CHF)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency-format">Currency Format</Label>
            <Select defaultValue="symbol-left">
              <SelectTrigger id="currency-format">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="symbol-left">$1,234.56</SelectItem>
                <SelectItem value="symbol-right">1,234.56 $</SelectItem>
                <SelectItem value="code-left">USD 1,234.56</SelectItem>
                <SelectItem value="code-right">1,234.56 USD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Measurement Units */}
      <Card>
        <CardHeader>
          <CardTitle>Measurement Units</CardTitle>
          <CardDescription>
            Choose your preferred measurement system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="units">Unit System</Label>
            <Select defaultValue="imperial">
              <SelectTrigger id="units">
                <SelectValue placeholder="Select unit system" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="imperial">Imperial (miles, pounds, °F)</SelectItem>
                <SelectItem value="metric">Metric (km, kg, °C)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
