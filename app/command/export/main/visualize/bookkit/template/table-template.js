const template = (table, exportItem) => {
    const [tableColumns, tableData] = table;
    return `<uu5string/>
            <UU5.Bricks.Lsi>
                <UU5.Bricks.Lsi.Item language="en">
                    <UU5.Bricks.Section contentEditable level="3" header="${exportItem?.visualize?.header}" colorSchema=null>
                        <UuContentKit.Bricks.BlockDefault>
                            <UU5.RichText.Block uu5string="Last update on ${new Date()}"/>
                        </UuContentKit.Bricks.BlockDefault>
                        <Uu5TilesBricks.Table 
                            columns='<uu5json/>${JSON.stringify(tableColumns)}' 
                            data='<uu5json/>${JSON.stringify(tableData)}'
                        />
                    </UU5.Bricks.Section>
                </UU5.Bricks.Lsi.Item>
            </UU5.Bricks.Lsi>`
}

module.exports = template;