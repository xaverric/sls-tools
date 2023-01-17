const template = (code) => {
    return `<uu5string/>
        <UU5.Bricks.Lsi>
            <UU5.Bricks.Lsi.Item language="en">
                <UuContentKit.Bricks.BlockDefault>
                    <UU5.RichText.Block uu5string="<uu5string/>
                        <UU5.Bricks.Div>
                            <strong>Exported on:</strong> ${new Date()}
                        </UU5.Bricks.Div>
                        <UU5.Bricks.Div>
                            <strong>Data:</strong> <UuContentKit.Links.FileLink src=\\"${code}\\"></UuContentKit.Links.FileLink>
                        </UU5.Bricks.Div>"
                    />
                </UuContentKit.Bricks.BlockDefault>
            </UU5.Bricks.Lsi.Item>
        </UU5.Bricks.Lsi>
    `
}

module.exports = template;