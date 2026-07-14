!macro customInstall
  DetailPrint "Register cutelearn:// protocol"
  DeleteRegKey HKCU "Software\Classes\cutelearn"
  WriteRegStr HKCU "Software\Classes\cutelearn" "" "URL:CuTe Learning Protocol"
  WriteRegStr HKCU "Software\Classes\cutelearn" "URL Protocol" ""
  WriteRegStr HKCU "Software\Classes\cutelearn\DefaultIcon" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME},1"
  WriteRegStr HKCU "Software\Classes\cutelearn\shell" "" ""
  WriteRegStr HKCU "Software\Classes\cutelearn\shell\open" "" ""
  WriteRegStr HKCU "Software\Classes\cutelearn\shell\open\command" "" '"$INSTDIR\${APP_EXECUTABLE_FILENAME}" "%1"'
!macroend

!macro customUnInstall
  DetailPrint "Unregister cutelearn:// protocol"
  DeleteRegKey HKCU "Software\Classes\cutelearn"
!macroend
