import React, { PureComponent, ReactNode } from 'react'
import classnames from 'classnames'

import './RadioGroup.less'
import { Empty } from '../../common/types'

interface IRadioGroupProps {
  value: any
  data: any[]
  onChange(value: any): void
  renderItem(value: any): ReactNode
  itemValue(value: any): any
  className: string
}

export default class RadioGroup extends PureComponent<IRadioGroupProps, Empty> {
  handleClick = (value: any) => {
    this.props.onChange(value)
  }

  render() {
    const { renderItem, itemValue, className } = this.props

    return (
      <div className={classnames('radio-group', className)}>
        {
          this.props.data.map((item) => {
            const value = itemValue(item)

            return (
              <div
                key={value}
                className={classnames('radio-item', {
                  '-checked': value === this.props.value,
                })}
                onClick={() => this.handleClick(value)}
              >
                {renderItem(item)}
              </div>
            )
          })
        }
      </div>
    )
  }

  static defaultProps = {
    className: '-standard',

    renderItem(item: any) {
      return item
    },

    itemValue(item: any) {
      return item
    },
  }
}
