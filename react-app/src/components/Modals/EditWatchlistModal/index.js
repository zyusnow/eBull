import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { FaRegEdit } from 'react-icons/fa';
import {Modal} from '../../../Context/Modal'
import {editUserWatchlist} from '../../../store/watchlist'


function EditWatchlistModal(watchlistId) {
    const dispatch = useDispatch()
    const watchlist = useSelector(state => state.watchlist?.watchlists[+watchlistId])

    const [showEditModal, setShowEditModal] = useState(false);
    const [name, setName] = useState(watchlist?.name)
    const [errors, setErrors] = useState([])

    const updatedWatchlist = async (e) => {
        e.preventDefault()

        const watchlistInfo = {
            watchlistId,
            name
        }

        const data = await dispatch(editUserWatchlist(watchlistInfo))
        if (data.errors) {
            setErrors(data.errors)
        } else {
            setShowEditModal(false)
        }

    }

    return (
        <>
            <div>
                <button className='delete_btn' onClick={() => setShowEditModal(true)}>
                    <FaRegEdit className='edit_watchlist_btn' />
                    Edit watchlist
                </button>
                {showEditModal && (
                    <Modal onClose={() => setShowEditModal(false)}>
                        <h3>Edit watchlist</h3>
                        <form>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <div onClick={() => setShowEditModal(false)}>Cancel</div>
                            <button onClick={updatedWatchlist} type="submit" disabled={!name}>Update Watchlist</button>
                        </form>
                        <div>
                            {errors?.length > 0 && <ul className="errors">
                                {errors.map((error, ind) => <li key={ind}>{error}</li>)}
                            </ul>}
                        </div>
                    </Modal>
                )}
            </div>
        </>
    )
}


export default EditWatchlistModal