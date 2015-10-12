import React from 'react'
import Field from './Field'

const Locales = React.createClass({
    mixins: [Field],

    getDefaults() {
        let defaults = {}
        this.context.data.locales.forEach(locale => defaults[locale] = true)

        return defaults
    },

    toggleLocale(locale) {
        return () => {
            let locales = this.context.media.custom_properties.locales || this.getDefaults()
            locales[locale] = !locales[locale]

            this.context.alt.getActions('media').updateCustomProperties(this.context.media.id, { locales: locales })
        }
    },

    render() {
        let locales = this.context.media.custom_properties.locales || this.getDefaults()
        
        let localeToggles = this.context.data.locales.map(locale => {
            let active = locales[locale]

            return (
                <span key={locale}
                      onClick={this.toggleLocale(locale)}
                      className={`toggle ${active ? '-active' : ''}`}>
                    {locale}
                </span>
            )
        })

        return <div style={this.props.style}>{localeToggles}</div>
    }
})

export default Locales
