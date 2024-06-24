import React from "react";
import Image from "next/image";

// Define the props interface with optional imageSrc and imageAlt
interface TitleProps {
  imageSrc?: string;
  imageAlt?: string;
  titleText: string;
  highlightText: string;
}

export const Title = ({ imageSrc, imageAlt, titleText, highlightText }: TitleProps) => {
  return (
    <div className="leading-[5rem] max-md:text-4xl max-md:leading-10">
      <div className="w-full max-md:max-w-full">
        <h1 className="text-3xl font-clash font-semibold text-neutrals-900 md:text-5xl dark:text-neutrals-300">
          {titleText} 
          <span className="text-accents-blue"> {highlightText}</span>
        </h1>
      </div>
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={imageAlt || "Image"}
          width={241}
          height={32}
          className="mt-2"
          priority={true}
          style={{ width: 'auto', height: '36px' }}
        />
      )}
    </div>
  );
};

export default Title;
