import shortid from 'shortid'

export const SIDEBAR_ITEM = 'sidebarItem'
export const ROW = 'row'
export const COLUMN = 'column'
export const COMPONENT = 'component'

export const SIDEBAR_ITEMS = [
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'editor',
      title: 'Text',
      icon: 'font',
      body: {
        content: 'Some input',
        setting: {},
      },
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'image',
      title: 'Image',
      icon: 'image',
      body: {
        content: 'Some name',
        setting: {},
      },
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'button',
      title: 'Button',
      icon: 'stop',
      body: {
        content: 'Some name',
        setting: {},
      },
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'video',
      title: 'Video',
      icon: 'camera',
      body: {
        content: 'Some name',
        setting: {},
      },
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'map',
      title: 'Map',
      icon: 'map-location',
      body: {
        content: 'Some name',
        setting: {},
      },
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'form',
      title: 'Form',
      icon: 'indent',
      body: {
        content: 'Some email',
        setting: {},
      },
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'slider',
      title: 'Slider',
      icon: 'panorama',
      body: {
        content: 'Some phone',
        setting: {},
      },
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'accordion',
      title: 'Accordion',
      body: {
        content: 'Some image',
        setting: {},
      },
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: 'social',
      title: 'Social Link',
      icon: 'share-nodes',
      body: {
        content: 'Some image',
        setting: {},
      },
    },
  },
]
