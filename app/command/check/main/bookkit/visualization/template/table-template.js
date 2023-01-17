const template = (table) => {
    const [tableColumns, tableData] = table;
    return `<uu5string/>
            <UU5.Bricks.Lsi>
                <UU5.Bricks.Lsi.Item language="en">
                    ${Object.keys(tableData).map(group => `
                        <UU5.Bricks.Section contentEditable level="3" header="${group}" colorSchema=null>
                        <UuContentKit.Bricks.BlockDefault>
                            <UU5.RichText.Block uu5string="Last update on ${new Date()}"/>
                        </UuContentKit.Bricks.BlockDefault>
                        <Uu5TilesBricks.Table 
                            columns='<uu5json/>${JSON.stringify(tableColumns)}' 
                            data='<uu5json/>${JSON.stringify(tableData[group])}'
                        />
                        </UU5.Bricks.Section>
                    `)}
                </UU5.Bricks.Lsi.Item>
            </UU5.Bricks.Lsi>`
}

module.exports = template;