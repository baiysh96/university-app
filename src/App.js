import './App.css';
import {useEffect, useState} from "react";
import Spinner from "./components/Spinner";
import axios from "axios";
import Form from "./components/Form";


function App() {
    const [modalActive, setModalActive] = useState(false)
    const [students, setStudents] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [editingUser,setEditingUser] = useState(null)


    useEffect(() => {
        axios("https://6297ae298d77ad6f75076dfd.mockapi.io/students/")
            .then((res) => {
                setStudents(res.data)
                setIsLoading(false)
            })
    })


    const handleEdite = (student) => {
        setEditingUser(student)
        setModalActive(true)

    }
    const deleteStudent = async (id) => {
        await axios.delete(`https://6297ae298d77ad6f75076dfd.mockapi.io/students/${id}`)
        const studentList = students.filter((item) => item.id !== id)
        setStudents(studentList)
    }
    if (isLoading) {
        return <Spinner/>
    }

    return (
        <div >
            {
                modalActive &&
                <div
                    className="bg-[#0e101c] d-flex justify-center align-middle form fixed right-0 w-full bg-rgba(0 0 0 0.5)">
                    <Form
                        setModalActive={setModalActive}
                        students={students}
                        setStudents={setStudents}
                        editingUser={editingUser}
                        setEditingUser={setEditingUser}
                    />
                </div>
            }
            <div className="bg-blue-200">
                <button onClick={() => setModalActive(true)} className="modalBtn">Add new student</button>
            </div>
            <table className="table-auto w-full">
                <thead>
                <tr className="bg-blue-400 text-center">
                    <th
                        className="
                           w-1/9
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           border-l border-transparent
                           "
                    >
                        #
                    </th>
                    <th
                        className="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                    >
                        ФИО студента
                    </th>
                    <th
                        className="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                    >
                        Группа
                    </th>
                    <th
                        className="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                    >
                        Год поступления
                    </th>
                    <th
                        className="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                    >
                        Е-mail
                    </th>
                    <th
                        className="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           border-r border-transparent
                           "
                    >
                        Номер телефона
                    </th>
                    <th
                        className="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           border-r border-transparent
                           "
                    >
                        Опции
                    </th>

                </tr>
                </thead>
                <tbody>
                {
                    students.map((student) => (
                        <tr key={student.id}>
                            <td className=" text-center text-dark text-base  py-5  px-2  bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
                                {student.id}
                            </td>
                            <td className=" text-center text-dark text-base  py-5  px-2  bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
                                {student.name}
                            </td>
                            <td className=" text-center text-dark text-base  py-5  px-2  bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
                                {student.group}
                            </td>
                            <td className=" text-center text-dark text-base  py-5  px-2  bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
                                {student.year.split("-").reverse().join("-")}
                            </td>
                            <td className=" text-center text-dark text-base  py-5  px-2  bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
                                {student.email}
                            </td>
                            <td className=" text-center text-dark text-base  py-5  px-2  bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
                                {student.phone}
                            </td>
                            <td className=" text-center text-dark text-base  py-5  px-2  bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">
                                <button onClick={() => handleEdite(student) && setModalActive(true)}
                                        className="border border-primary mr-2 py-2 px-4  inline-block rounded bg-yellow-300 text-black-300 hover:text-black-300  hover:bg-amber-700 "
                                        type="button"
                                >
                                    Edite
                                </button>
                                <button onClick={() => deleteStudent(student.id)}
                                        className="border border-primary  py-2 px-4  inline-block rounded bg-red-600 text-white hover:bg-red-800 hover:text-black-300 "
                                        type="button"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

        </div>
    );
}

export default App;
