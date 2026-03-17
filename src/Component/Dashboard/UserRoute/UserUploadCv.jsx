import React, { useState } from 'react';
import { UploadCloud, X, Plus } from 'lucide-react';
import Swal from 'sweetalert2';

const UserUploadCv = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const suggestions = ['Project Management', 'Data Science', 'Salesforce'];


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                return Swal.fire("Error", "File size exceeds 5MB limit!", "error");
            }
            setSelectedFile(file);
        }
    };

    const addTag = (tag) => {
        const trimmedTag = tag.trim();
        if (trimmedTag && !tags.includes(trimmedTag)) {
            setTags([...tags, trimmedTag]);
        }
        setInputValue('');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl p-8 relative">
                <button className="absolute top-6 right-6 text-gray-400"><X size={24} /></button>

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 text-left">Upload your resume</h2>
                    <p className="text-gray-500 mt-1 text-left">Help us get to know you better by sharing your resume.</p>
                </div>

                {/* Custom Upload Area (No Library Needed) */}
                <label className="border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-all cursor-pointer mb-8 border-gray-200 bg-white hover:border-blue-400 group">
                    <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.docx" />
                    
                    <div className="bg-gray-50 p-4 rounded-xl mb-4 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                        <UploadCloud size={32} />
                    </div>
                    
                    <div className="text-center">
                        {selectedFile ? (
                            <p className="text-blue-600 font-semibold">{selectedFile.name}</p>
                        ) : (
                            <>
                                <p className="text-gray-700 font-medium">
                                    <span className="text-blue-600">Click to upload</span> your resume
                                </p>
                                <p className="text-xs text-gray-400 mt-2 font-medium">
                                    Acceptable file types: PDF, DOCX (5MB max)
                                </p>
                            </>
                        )}
                    </div>
                </label>

                {/* Keywords Section (Same as before) */}
                <div className="mb-10">
                    <label className="block text-gray-700 font-bold mb-3 text-left">Add Keywords to Highlight Your Skills</label>
                    <div className="border rounded-xl p-3 min-h-[100px] bg-white">
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                                <span key={index} className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                                    {tag} <X size={14} className="cursor-pointer" onClick={() => setTags(tags.filter((_, i) => i !== index))} />
                                </span>
                            ))}
                            <input 
                                type="text"
                                className="flex-1 outline-none text-sm min-w-[150px] py-1"
                                placeholder="Type your tags here..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addTag(inputValue)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {suggestions.map((sug, idx) => (
                            <button key={idx} onClick={() => addTag(sug)} className="flex items-center gap-1 border border-gray-200 text-gray-600 px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">
                                <Plus size={12} /> {sug}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-center border-t pt-8">
                    {/* <button className="px-6 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-700">Save as draft</button> */}
                    <button className="px-8 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">Upload Your Cv </button>
                </div>
            </div>
        </div>
    );
};

export default UserUploadCv;