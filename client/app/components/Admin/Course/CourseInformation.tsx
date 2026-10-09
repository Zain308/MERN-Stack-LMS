import { styles } from '@/app/styles/style';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { FC, useState, useEffect } from 'react';

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
}

const CourseInformation: FC<Props> = ({ courseInfo, setCourseInfo, active, setActive }) => {
  const { data } = useGetHeroDataQuery("Categories", {});
  const [categories, setCategories] = useState<any[]>([]);
  const [dragging, setDragging] = useState(false); // Bug 1 Fixed: Added dragging state

  useEffect(() => {
    if (data) {
      setCategories(data.categories || data); // Bug 2 Fixed: Populate categories from API data
    }
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result }); // Bug 3 Fixed: Corrected thumbnail assignment
        }
      };
      reader.readAsDataURL(file);
    }
  }

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  }

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  }

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      }
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className='w-[80%] m-auto mt-24'>
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label htmlFor="name">Course Name</label>
          <input 
            type='text'
            required
            value={courseInfo.name}
            onChange={(e: any) => 
              setCourseInfo({...courseInfo, name: e.target.value})
            }
            id='name'
            placeholder='MERN stack LMS platform with next 13'
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label htmlFor="description">Course Description</label>
          <textarea 
            id='description'
            cols={30} 
            rows={8}
            value={courseInfo.description}
            onChange={(e: any) => 
              setCourseInfo({...courseInfo, description: e.target.value})
            }
            placeholder='Write something amazing...'
            className={`${styles.input} !h-min py-2`}
          />
        </div>
        <br />
        <div className='w-full flex justify-between'>
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course Price</label>
            <input 
              type="number" 
              required
              value={courseInfo.price}
              onChange={(e: any) => 
                setCourseInfo({...courseInfo, price: e.target.value})
              }
              id='price'
              placeholder='29'
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label}`}>Estimated Price (optional)</label>
            <input 
              type="number" 
              value={courseInfo.estimatedPrice}
              onChange={(e: any) => 
                setCourseInfo({...courseInfo, estimatedPrice: e.target.value})
              }
              id='estimatedPrice'
              placeholder='79'
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div>
          <label className={`${styles.label}`} htmlFor='tags'>Course Tags</label>
          <input 
            type="text"
            required
            value={courseInfo.tags}
            onChange={(e: any) =>
              setCourseInfo({...courseInfo, tags: e.target.value})
            } 
            id='tags'
            placeholder='MERN, Next 13, Socket io, tailwind css, LMS'
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div>
          <label className={`${styles.label}`}>Course Categories</label>
          <select 
            className={`${styles.input}`} 
            value={courseInfo.category}
            onChange={(e: any) => setCourseInfo({...courseInfo, category: e.target.value})}
          >
            <option value="">Select Category</option>
            {categories.map((item: any) => (
              <option value={item._id} key={item._id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div className="w-full">
          <input 
            type="file" // Bug 4 Fixed: Changed from "text" to "file"
            accept='image/*'
            id='file'
            className='hidden'
            onChange={handleFileChange}  
          />
          <label 
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center cursor-pointer ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {
              courseInfo.thumbnail ? (
                <img src={courseInfo.thumbnail} alt="" className="max-h-full w-full object-cover"/>
              ): (
                <span className="text-black dark:text-white">
                  Drag and Drop your thumbnail here & click to browse
                </span>
              )
            }
          </label>
        </div>
        <br />
        <div className="w-full flex items-center justify-end">
            <input 
              type="submit"  
              value="Next"
              className='w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer'
            />
        </div>
        <br />
        <br />
      </form>
    </div>
  )
}

export default CourseInformation;