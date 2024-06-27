import CardProduct from "@/components/CardProduct";
import Layout from "@/components/Layout";
import { SkeletonCard, SkeletonProfile } from "@/components/skeletons/ProfileOwner";
import { toast } from "@/components/ui/use-toast";
// import { getMyKos } from "@/utils/apis/user/api";
// import { IMyKosType } from "@/utils/apis/user/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "@/utils/apis/profile/type";
import AlertDelete from "@/components/AlertDelete";
import { useAuth } from "@/utils/context/auth";
import { getProfileSync, deleteProfileSync, updateProfileSync, changePasswordSync } from "@/utils/apis/profile/api";
import { UserType } from "../../../backend/src/shared/types";

const ProfileOwner = () => {
  // const [dataKos, setDataKos] = useState<IMyKosType[]>();
  // const [loading, setLoading] = useState(false);
  const { changeToken } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [selectedImage, setSelectedImage] = useState<File | null>(null);
  // const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const [formData, setformData] = useState<UserType>({
    firstName: "",
    lastName: "",
    email: "",
    role:"",
    phone:"",
  });

  const [formPassword, setFormPassword] = useState<changePassword>({
    old_password: "",
    new_password: "",
    konfirmasi_password: "",
  });

 //  uploadedImageUrl ? uploadedImageUrl : "";

  const getProfile = async () => {
    
      const response = await getProfileSync();
      setformData({
        firstName: response.firstName,
        lastName: response.lastName,
        role: response.role,
        email: response.email,
        phone: response.phone,
      });
      
    
  };

  const deleteProfile = async () => {
    try {
      const response = await deleteProfileSync();
      if (response) {
        changeToken();
        navigate("/login");
        toast({
          description: "Berhasil dihapus",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: (error as Error).message,
      });
    }
  };

  const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    const firstName = formData.firstName;
    const lastName = formData.lastName;
    const role = formData.role;
    const email = formData.email;
    const phone = formData.phone;
    e.preventDefault();
    const specialCharsRegex = /[^a-zA-Z0-9_]+/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;

    if (specialCharsRegex.test(firstName) || specialCharsRegex.test(lastName)) {
      toast({
        variant: "destructive",
        description: "Name dan User Name hanya boleh berisi huruf, angka, dan underscore",
      });
      return;
    }

    if (!emailRegex.test(email)) {
      toast({
        variant: "destructive",
        description: "Format email tidak valid. Email harus berakhir dengan .com, .net, .org, atau ekstensi domain lainnya yang berukuran 2 atau 3 karakter.",
      });
      return;
    }

  
      const formData = new FormData();
      
        formData.append("name", firstName);
        formData.append("user_name", lastName);
        formData.append("gender", role);
        formData.append("email", email);
        formData.append("mobile", phone);
      
      
  };

  const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formPassword.new_password.length < 6) {
      toast({
        variant: "destructive",
        description: "Password baru harus terdiri dari setidaknya 6 karakter",
      });
      return;
    }

    if (formPassword.new_password === formPassword.konfirmasi_password) {
      try {
        const response = await changePasswordSync(formPassword.new_password, formPassword.old_password);
        if (response) {
          toast({
            description: "Berhasil merubah Password",
          });
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          description: "Password saat ini yang anda Masukan Invalid",
        });
      }
    } else {
      toast({
        description: "Password baru dan Konfirmasi Password harus sama",
      });
    }
  };

  // const getDataKos = async () => {
  //   try {
  //     setLoading(true);
  //     const result = await getMyKos();
  //     setDataKos(result.data);
  //   } catch (error) {
  //     toast({
  //       variant: "destructive",
  //       description: (error as Error).message,
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.currentTarget.files?.[0];
  //   if (file) {
  //     setSelectedImage(file);
  //   }
  // };

  const handlePerubahan = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setformData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  useEffect(() => {
    getProfile();
  //  getDataKos();
  }, []);

  return (
    <>
      <Layout>
        <div className="max-h-screen overflow-y-scroll kos ">
          <div className="flex flex-col px-8 pb-4 bg-white shadow-sm h-screen">
            <div className="self-center w-full max-w-[1353px] max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                <div className="flex flex-col 2xl:w-[40vw] h-[40vh] w-[40%] max-md:ml-0 max-md:w-full">
                  {loading ? (
                    <SkeletonProfile />
                  ) : (
                     <div className="flex flex-col grow py-11 pr-12 pl-6 w-full text-base leading-7 bg-white rounded border border-solid shadow-sm border-stone-400 max-md:px-5 max-md:mt-6 max-md:max-w-full">
                      <form onSubmit={updateProfile}>
                        {/* <div className="flex justify-center items-center px-16 text-sm font-medium leading-6 text-black whitespace-nowrap bg-white rounded max-md:px-5 max-md:max-w-full">
                        <div className="flex flex-col items-center max-w-full w-[118px]"> */}
                    
                    

                        <div className="flex gap-5 justify-between mt-5 whitespace-nowrap text-zinc-900 max-md:flex-wrap max-md:max-w-full">
                          <div className="self-center">First Name</div>
                          <div className="input-container">
                            <input
                              id="firstName"
                              onChange={handlePerubahan}
                              required
                              value={formData.firstName}
                              type="text"
                              placeholder="Masukan Nama"
                              className=" grow focus:outline-none w-[45vw] 2xl:w-[18vw] md:w-[22vw] p-4 bg-white rounded border border-solid shadow-sm border-zinc-400"
                            />
                          </div>
                        </div>
                        </div>

                        {/* // <div className="flex gap-5 justify-between mt-5 text-zinc-900 max-md:flex-wrap max-md:max-w-full">
                        //   <div className="flex-auto self-center">Jenis Kelamin</div>
                        //   <div className="input-container">
                        //     <select
                        //       id="gender"
                        //       onChange={handlePerubahan}
                        //       value={formData.role}
                        //       className="grow focus:outline-none w-[45vw] 2xl:w-[18vw] md:w-[22vw] p-4 bg-white rounded border border-solid shadow-sm border-zinc-400 max-md:pr-5"
                        //     >
                        //       <option value="" disabled>
                        //         Pilih Jenis Kelamin
                        //       </option>
                        //       <option value="laki-laki">Laki-Laki</option>
                        //       <option value="perempuan">Perempuan</option>
                        //     </select>
                        //   </div>
                        // </div> */}

                        <div className="flex gap-5 justify-between mt-4 whitespace-nowrap text-zinc-900 max-md:flex-wrap max-md:max-w-full">
                          <div className="self-center ">Last Name</div>
                          <div className="input-container">
                            <input
                              id="lastName"
                              onChange={handlePerubahan}
                              value={formData.lastName}
                              required
                              type="text"
                              placeholder="Masukan Username"
                              className="grow  focus:outline-none w-[45vw] 2xl:w-[18vw] md:w-[22vw] p-4 bg-white rounded border border-solid shadow-sm border-zinc-400 max-md:pr-5"
                            />
                          </div>
                        </div>
                        

                        <div className="flex gap-5 justify-between mt-5 whitespace-nowrap max-md:flex-wrap  max-md:max-w-full">
                          <div className="self-center  text-black">Email</div>
                          <div className="input-container">
                            <input
                              id="email"
                              onChange={handlePerubahan}
                              value={formData.email}
                              required
                              type="email"
                              placeholder="Masukan Email"
                              className="grow  focus:outline-none w-[45vw] 2xl:w-[18vw] md:w-[22vw] p-4 bg-white rounded border border-solid shadow-sm border-zinc-400 text-zinc-900 max-md:pr-5"
                            />
                          </div>
                        </div>
                      
                        <div className="flex gap-5 justify-between mt-5 whitespace-nowrap text-zinc-900 max-md:flex-wrap max-md:max-w-full">
                          <div className="self-center ">Phone Number</div>
                                <div className="input-container">
                                <input
                                id="phone"
                                onChange={handlePerubahan}
                                value={formData.phone}
                                required
                                type="tel" // Use 'tel' type for phone numbers
                                placeholder="Masukan Nomor Telepon"
                                className="grow  focus:outline-none w-[45vw] 2xl:w-[18vw] md:w-[22vw] p-4 bg-white rounded border border-solid shadow-sm border-zinc-400 max-md:pr-5"
                                />
                          </div>
                        </div>
                       

                        <div className="flex gap-5 justify-between items-start self-end mt-32 max-w-full w-full max-md:mt-10">
                          <div className="flex-auto md:self-end md:mt-9 md:text-base text-sm text-sky-400 cursor-pointer" onClick={() => setShowPopup(!showPopup)}>
                            Ganti Password
                          </div>
                          <div className="flex gap-5 self-start text-center text-white whitespace-nowrap">
                            <button type="submit" className="grow justify-center px-3 py-2 md:px-4 md:py-3 bg-lime-600 rounded shadow-sm">
                              Edit Akun
                            </button>
                            <AlertDelete onAction={deleteProfile} title="Apakah anda yakin?" description="Penghapusan data ini tidak dapat dikembalikan, dan bersifat permanen" background="bg-red-600 hover:bg-red-400">
                              <button className="grow justify-center md:px-3 md:py-4 px-3 py-2 bg-red-600 rounded shadow-sm hover:bg-red-400">Hapus Akun</button>
                            </AlertDelete>
                          </div>
                        </div>


                      </form>
                    </div>
                  )}
                </div>

                <div className="flex flex-col ml-5 md:ml-0 2xl:w-[80vw] w-[60%] max-md:ml-0 max-md:w-full border-2 border-slate-200  py-6">
                  {loading ? (
                    <SkeletonCard />
                  ) : (
                    <>
                      {dataKos ? (
                        <>
                          {dataKos.map((item) => (
                            <CardProduct
                              id={item.id}
                              kos_name={item.kos_name}
                              rating={`${item.rating}`}
                              address={item.address}
                              kos_facilities={item.kos_facilities}
                              photo_kos={item.photo_kos.main_kos_photo}
                              hidden={true}
                              price={item.price}
                              refetchData={getDataKos}
                            />
                          ))}
                        </>
                      ) : (
                        <div className="flex flex-col grow items-center px-16 py-11 w-full text-sm bg-white rounded shadow-sm text-zinc-900 max-md:px-5 max-md:mt-6 max-md:max-w-full">
                          <div className="flex items-center self-start gap-2 text-lg leading-7 max-md:max-w-full">
                            <img src="https://img.icons8.com/windows/32/smart-home-2.png" alt="home" className="w-[20px]" />
                            <span>Riwayat Apartement</span>
                          </div>
                          <div className="w-full">
                            <div className="mt-16 md:text-2xl text-lg font-bold leading-9 whitespace-nowrap max-md:mt-10">Kamu belum posting apartement kamu</div>
                            <div className="mt-10 leading-6 md:w-[409px] w-full">Kamu mempunyai apartement? Yuk posting apartement mu dan sewa apartement mu di Gold Coast Bahama PIK Jakarta.</div>

                            <div className="flex flex-col justify-start w-full">
                              <div className="flex gap-4 mt-14 whitespace-nowrap leading-[157%] max-md:mt-10">
                                <img loading="lazy" srcSet="https://img.icons8.com/dotty/80/buy-for-coins--v2.png" alt="buy-for-coins--v2" className="aspect-[0.96] w-[52px]" />
                                <div className="grow self-center md:text-base text-xs">Tagihan dan kontrak sewa tercatat rapi</div>
                              </div>
                              <div className="flex gap-5 mt-4 whitespace-nowrap leading-[171%]">
                                <img loading="lazy" srcSet="https://img.icons8.com/carbon-copy/100/money.png" className="aspect-[0.96] w-[50px]" />
                                <div className="grow self-start mt-4 md:text-base text-xs">Gold Coast Bahama PIK menjaga keamanan transaksi</div>
                              </div>
                              <div className="flex justify-center items-center gap-5 mt-5 whitespace-nowrap leading-[157%]">
                                <img
                                  loading="lazy"
                                  srcSet="https://img.icons8.com/external-smashingstocks-detailed-outline-smashing-stocks/66/external-payment-method-shopping-and-commerce-smashingstocks-detailed-outline-smashing-stocks.png"
                                  alt="external-payment-method-shopping-and-commerce-smashingstocks-detailed-outline-smashing-stocks"
                                  className="w-[50px] h-[40px]"
                                />
                                <div className="grow self-center md:text-base text-xs">Cashless, dengan beragam metode pembayaran</div>
                              </div>
                            </div>
                          </div>
                          <div
                            onClick={() => navigate("/buat-kos")}
                            className="justify-center items-center self-center px-16 py-6 mt-7 mr-6 max-w-full text-center text-white whitespace-nowrap bg-lime-600 rounded-sm shadow-sm leading-[171%] w-[476px] max-md:px-5 max-md:mr-2.5"
                          >
                            Mulai Buat Kos
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {showPopup && (
                    <div>
                      <div className="fixed inset-0 bg-black opacity-50 z-50"></div>
                      <div className="fixed inset-0 flex items-center justify-center z-50 font-Poppins">
                        <form onSubmit={changePassword}>
                          <div className="flex flex-col px-16 py-8 text-sm text-black bg-white rounded-2xl shadow-2xl max-w-[772px] max-md:px-5">
                            <div className="text-5xl font-bold max-md:max-w-full">Ganti Password</div>
                            <div className="mt-3.5 text-xs max-md:max-w-full">Password saat ini</div>
                            <input
                              required
                              type={!showPassword ? "password" : "text"}
                              className="justify-center p-3 mt-1.5 whitespace-nowrap bg-white rounded-md border border-solid shadow-sm border-slate-600 border-opacity-40 max-md:max-w-full"
                              placeholder="*******"
                              onChange={(e: any) =>
                                setFormPassword((prev) => ({
                                  ...prev,
                                  old_password: e.target.value,
                                }))
                              }
                            />

                            <div className="mt-8 text-xs max-md:max-w-full">Password Baru</div>
                            <input
                              required
                              type={!showPassword ? "password" : "text"}
                              className="justify-center p-3 mt-1.5 whitespace-nowrap bg-white rounded-md border border-solid shadow-sm border-slate-600 border-opacity-40 max-md:max-w-full"
                              placeholder="*******"
                              onChange={(e: any) =>
                                setFormPassword((prev) => ({
                                  ...prev,
                                  new_password: e.target.value,
                                }))
                              }
                            />

                            <div className="mt-8 text-xs max-md:max-w-full">Konfirmasi Password Baru</div>
                            <input
                              required
                              type={!showPassword ? "password" : "text"}
                              className="justify-center p-3 mt-1.5 whitespace-nowrap bg-white rounded-md border border-solid shadow-sm border-slate-600 border-opacity-40 max-md:max-w-full"
                              placeholder="*******"
                              onChange={(e: any) =>
                                setFormPassword((prev) => ({
                                  ...prev,
                                  konfirmasi_password: e.target.value,
                                }))
                              }
                            />

                            <span onClick={() => setShowPassword(!showPassword)} className="mt-5">
                              {!showPassword ? (
                                <div className="flex gap-3 items-center">
                                  <img width="30" height="30" className="rounded-full border-2 p-1 border-slate-500" src="https://img.icons8.com/ios/50/closed-eye.png" alt="closed-eye" /> Tampilkan Password
                                </div>
                              ) : (
                                <div className="flex gap-3 items-center">
                                  <img width="30" height="30" className="rounded-full border-2 p-1 border-slate-500" src="https://img.icons8.com/tapes/40/experimental-visible-tapes.png" alt="experimental-visible-tapes" /> Sembunyikan
                                  Password
                                </div>
                              )}
                            </span>
                            <div className="flex justify-center gap-6">
                              <div className="flex gap-2 self-start px-6 py-3 mt-12 font-bold text-white whitespace-nowrap hover:bg-blue-400 bg-blue-600 rounded-md max-md:px-5 max-md:mt-10">
                                <button type="submit">Kirim</button>
                              </div>
                              <div className="flex gap-2 self-start px-6 py-3 mt-12 font-bold hover:bg-opacity-80 text-black border-[0.5px] border-black whitespace-nowrap bg-white rounded-md max-md:px-5 max-md:mt-10">
                                <button onClick={() => setShowPopup(!showPopup)}>Tutup</button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ProfileOwner;
