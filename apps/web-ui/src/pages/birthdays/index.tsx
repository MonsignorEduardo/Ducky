import BirthdayTable from '../../components/birthdays/BirthdayTable';
import Layout from '../../components/layout/layout';

const Commands = () => {
    return (
        <Layout>
            <div className="flex min-h-screen flex-col items-center justify-around">
                <h1 className="text-center text-7xl font-extrabold">
                    <span className="text-white">Birthdays</span>
                </h1>
                <BirthdayTable />
                {/* <label htmlFor="addBirthDayModal" className="modal-button btn">
                    Add Birthday
                </label>
                 <AddBirthDayModal />  */}
            </div>
        </Layout>
    );
};

export default Commands;
