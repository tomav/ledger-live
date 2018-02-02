// @flow

import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'

import { Modal, ModalBody } from 'components/base/Modal'

const stories = storiesOf('Modal', module)

stories.add('basic', () => {
  const isOpened = boolean('isOpened', true)
  return (
    <Modal
      isOpened={isOpened}
      render={({ onClose }) => (
        <Fragment>
          <ModalBody>Hey!</ModalBody>
          <ModalBody onClose={onClose}>Hoy!</ModalBody>
          <ModalBody>Hu!</ModalBody>
        </Fragment>
      )}
    />
  )
})
