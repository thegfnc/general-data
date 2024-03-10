import {contextDocumentTypeName} from '@sanity/assist'
import {Card} from '@sanity/ui'
import {SanityDocument} from 'sanity'
import {DefaultDocumentNodeResolver, StructureResolver, UserViewComponent} from 'sanity/structure'

export const GFNC_icon = <img src="/static/GFNC_icon.png" alt="GFNC" />
export const IIHD_icon = <img src="/static/IIHD_icon.png" alt="IIHD" />

export const structure: StructureResolver = (S) => {
  const GFNC_ListItem = S.listItem()
    .title('The Good for Nothings Club [GFNC]')
    .icon(() => GFNC_icon)
    .child(S.list().title('GFNC Documents').items([]))

  const IIHD_countryList = S.documentTypeList('IIHD_country')

  const IIHD_ListItem = S.listItem()
    .title('Is It Here? Data [IIHD]')
    .icon(() => IIHD_icon)
    .child(
      S.list()
        .title('IIHD Documents')
        .items([
          S.listItem()
            .icon(() => IIHD_icon)
            .title(IIHD_countryList.getTitle() || '')
            .child(IIHD_countryList),
        ]),
    )

  return S.list()
    .title('Projects')
    .items([
      S.listItem()
        .title('All Documents')
        .child(S.list().title('All Documents').items(S.documentTypeListItems())),
      S.documentTypeListItem(contextDocumentTypeName),
      S.divider(),
      GFNC_ListItem,
      IIHD_ListItem,
    ])
}

type UserViewComponentProps = {
  document: {
    draft: SanityDocument | null
    displayed: Partial<SanityDocument>
    historical: Partial<SanityDocument> | null
    published: SanityDocument | null
  }
}

const RawJSON: UserViewComponent = ({document}: UserViewComponentProps) => (
  <Card padding={4}>
    <pre>{JSON.stringify(document.displayed, null, 2)}</pre>
  </Card>
)

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S) => {
  return S.document().views([S.view.form(), S.view.component(RawJSON).title('Raw JSON')])
}
