import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'

export const AddNewFav = () => {

    const dispatch = useDispatch()

    const handleClicknew = () => {
        dispatch(uiOpenModal())
    }

    return (
        <button
            className="btn btn-primary fav"
            onClick={handleClicknew}
        >
            <i className="fas fa-plus"></i>

        </button>
    )
}
