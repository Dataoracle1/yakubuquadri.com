import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { tags as initialTags } from '../data/siteData';
import { Tag } from '../types';

const TagsSection: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>(initialTags);

  const handleTagClick = (tagId: number) => {
    setTags(tags.map(tag => ({
      ...tag,
      isActive: tag.id === tagId
    })));
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <motion.h2 
            className="text-3xl font-bold relative inline-block pb-3"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            My Expertise
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-orange"></span>
          </motion.h2>
        </div>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {tags.map(tag => (
            <motion.div 
              key={tag.id}
              className={`px-6 py-2 rounded-full cursor-pointer transition-all duration-300 ${
                tag.isActive 
                  ? 'bg-orange text-white' 
                  : 'bg-gray text-dark hover:bg-gray-200'
              }`}
              onClick={() => handleTagClick(tag.id)}
              whileHover={{ y: -3 }}
            >
              {tag.name}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TagsSection;