import Mainroutes from './routes/Mainroutes';
import Nav from './components/Nav';

const App = () => {


  return (
    <div className='min-h-screen w-full px-[10%] font-thin text-white bg-black'>
      <Nav />
      <Mainroutes />
    </div>
  )
};

export default App
