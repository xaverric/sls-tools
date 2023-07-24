const {escapeUu5StringArray} = require("../../../../../../bookkit/helper/uu5string-escape-helper");
const template = (data, exportItem) => {
    return `<uu5string/>
            <UU5.Bricks.Lsi>
                <UU5.Bricks.Lsi.Item language="en">
                    <UU5.Bricks.Section contentEditable level="3" header="${exportItem?.visualize?.header}" colorSchema=null>
                        <UuContentKit.Bricks.BlockDefault>
                            <UU5.RichText.Block uu5string="Last update on ${new Date()}"/>
                        </UuContentKit.Bricks.BlockDefault>
                        <UU5.CodeKit.CodeViewer value="${escapeUu5StringArray(data)}" codeStyle="json"/>
                    </UU5.Bricks.Section>
                </UU5.Bricks.Lsi.Item>
            </UU5.Bricks.Lsi>`
}

module.exports = template;