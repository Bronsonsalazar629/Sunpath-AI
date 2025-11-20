Set-Location "C:\Users\brons\Downloads\Mindmap\mindmap-app\mobile-app"
$yes = New-Object System.Management.Automation.Host.ChoiceDescription "&Yes", "Use port 8082"
$no = New-Object System.Management.Automation.Host.ChoiceDescription "&No", "Don't use port 8082"
$options = [System.Management.Automation.Host.ChoiceDescription[]]($yes, $no)
$result = $host.ui.PromptForChoice("Port in use", "Port 8081 is being used by another process. Use port 8082 instead?", $options, 0)
if ($result -eq 0) {
    npx expo start --lan
}