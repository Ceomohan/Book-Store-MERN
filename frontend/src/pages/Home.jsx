import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { Link } from 'react-router-dom'
import BooksTable from '../components/home/BooksTable'
import BooksCard from '../components/home/BooksCard'
import { MdOutlineAddBox } from 'react-icons/md'
const Home = () => {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    const [showType, setShowType] = useState('table')

    useEffect(() => {
        setLoading(true)
        axios
            .get('http://localhost:4000/books')
            .then((res) => {
                console.log(res.data)
                setBooks(res.data.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
    }, [])





    return (
        <div className="p-4">
            <div className="flex justify-center items-center gap-x-4">
                <button
                    className="bg-sky-300 hover:bg-sky-800 px-4 py-1 rounded-lg"
                    onClick={() => setShowType('table')}
                >
                    Table
                </button>
                <button
                    className="bg-sky-300 hover:bg-sky-800 px-4 py-1 rounded-lg"
                    onClick={() => setShowType('card')}
                >
                    Card
                </button>
            </div>




            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Books List</h1>
                <Link to='books/create'>
                    <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
            </div>
            {loading ? <Spinner /> : showType === 'table' ? (<BooksTable books={books} />) : (<BooksCard books={books} />)}




        </div>
    )
}

export default Home