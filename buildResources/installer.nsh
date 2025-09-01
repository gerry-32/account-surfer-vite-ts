!macro customInstall
  ; Registrierung als Standard-Browser
  WriteRegStr HKLM "Software\Clients\StartMenuInternet\AccountSurfer" "" "Account Surfer"
  WriteRegStr HKLM "Software\Clients\StartMenuInternet\AccountSurfer\Capabilities" "ApplicationName" "Account Surfer"
  WriteRegStr HKLM "Software\Clients\StartMenuInternet\AccountSurfer\Capabilities" "ApplicationDescription" "Browser for switching accounts"
  
  ; Protokolle zuordnen
  WriteRegStr HKLM "Software\Clients\StartMenuInternet\AccountSurfer\Capabilities\URLAssociations" "http" "AccountSurferURL"
  WriteRegStr HKLM "Software\Clients\StartMenuInternet\AccountSurfer\Capabilities\URLAssociations" "https" "AccountSurferURL"

  ; Registry-Location für Shell
  WriteRegStr HKLM "Software\RegisteredApplications" "Account Surfer" "Software\\Clients\\StartMenuInternet\\AccountSurfer\\Capabilities"

  ; Kommando-Zeile für Protokollhandler
  WriteRegStr HKCR "AccountSurferURL\shell\open\command" "" '"$INSTDIR\\AccountSurfer.exe" "%1"'

  ; Friendly name
  WriteRegStr HKCR "AccountSurferURL" "" "Account Surfer URL"

!macroend
