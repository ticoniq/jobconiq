import Image from "next/image";
import vodafone from "@/assets/images/vodafone-logo.png";
import intel from "@/assets/images/intel-logo.png";
import tesla from "@/assets/images/tesla-logo.png";
import amd from "@/assets/images/amd-logo.png";
import talkit from "@/assets/images/talkit-logo.png";

export function LogoClouds() {
  return (
    <section className="container">
      <div className="pt-14 md:pt-20">
        <h2 className="text-left text-lg">
          Companies we helped grow
        </h2>
        <div className="mt-10 grid grid-cols-4 items-center gap-x-8 gap-y-10 sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <Image
            className="col-span-2 max-h-10 w-full object-contain lg:col-span-1 filter dark:invert"
            src={vodafone}
            alt="Vodafone"
            width={158}
            priority={true}
            style={{ width: 'auto', height: '40px' }}
          />
          <Image
            className="col-span-2 max-h-10 w-full object-contain lg:col-span-1 filter dark:invert"
            src={intel}
            alt="Intel"
            width={158}
            priority={true}
            style={{ width: 'auto', height: '40px' }}
          />

          <Image
            className="col-span-2 max-h-10 w-full object-contain lg:col-span-1 filter dark:invert"
            src={tesla}
            alt="Tesla"
            width={158}
            priority={true}
            style={{ width: 'auto', height: '40px' }}
          />
          <Image
            className="col-span-2 max-h-10 w-full object-contain lg:col-span-1 filter dark:invert"
            src={amd}
            alt="AMD"
            width={158}
            priority={true}
            style={{ width: 'auto', height: '40px' }}
          />
          <Image
            className="col-span-2 max-h-10 w-full object-contain lg:col-span-1 filter dark:invert"
            src={talkit}
            alt="Talk IT"
            width={158}
            priority={true}
            style={{ width: 'auto', height: '40px' }}
          />
        </div>
      </div>
    </section>
  );
}
