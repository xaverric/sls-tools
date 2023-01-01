# sls-tools

## DOCUMENTATION TODO

(uuApp CMD API)
- call predefined set of URIs and store the outputs from the URIs to the single location => applicable for applicationConfiguration/get (file name predefined in the configuration)
  -- support binary data
- print specific configuration to the bookkit (table form)
    - list of configuration items
        - mapping of the attributes which should be displayed
        - specified bookkit location (page/section code)
        - display name
        - call command, user for authorization

(k8s)
- extract configmaps for the specified applications and
  -- store to the single location
  -- upload to the bookkit page (visually - table form, store file)
- option to verify the configuration is as expected
u k8s eportu by se s tim ještě dalo pohrát aby to umelo na základe konfigurace udelat export bud do json nebo do yaml (ted je to jen yaml)

export command 
- export k8s/cmd na filesystem + upload do bookkitu včetně vizualizace
- export compare - full export comparison only
- k8s export to add option yaml|json export, extract SERVER_CFG object 

check command
- call predefined URIs and verify its outcome 
- JSONpath + deep comparison of the expected outcome, if different, report the message to console

call command
- náhrada za uucommander