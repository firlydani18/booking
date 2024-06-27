import AlertDelete from "@/components/AlertDelete";
import Layout from "@/components/Layout";
import { toast } from "@/components/ui/use-toast";
import React, { useEffect, useState } from "react";
import { profile, changePassword } from "@/utils/apis/profile/type";
import { useNavigate } from "react-router-dom";
// import { IMyKosType } from "@/utils/apis/user/types";
import { useAuth } from "@/utils/context/auth";
//import NumberFormatter from "@/components/NumberFormatter";
//import logo from "../../assets/brand.png";
//import RatingPopup from "@/components/RatingPopup";
import { changePasswordSync, deleteProfileSync, getProfileSync, updateProfileSync } from "@/utils/apis/profile/api";
import { UserType } from "../../../backend/src/shared/types";
// import { calculateParsedDates, calculateResultEndDate } from "@/utils/apis/profile/functions";

const ProfileRenter = () => {
  // const [rating, showRating] = useState<boolean>(false);
  // const [dataKos, setDataKos] = useState<IMyKosType[]>();
  // const startDate = dataKos ? calculateParsedDates(dataKos) : new Date();
  // const resultEndDate = calculateResultEndDate(startDate);
  // const [status, setStatus] = useState(true);
  const { changeToken } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  // const [showRatingPopup, setShowRatingPopup] = useState(false);
  //const [selectedKosId, setSelectedKosId] = useState<string | null>(null);
  const [formData, setformData] = useState<UserType>({
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    phone:"",
  });

  const [formPassword, setFormPassword] = useState<changePassword>({
    old_password: "",
    new_password: "",
    konfirmasi_password: "",
  });

  uploadedImageUrl ? uploadedImageUrl : "";

  // const addRating = async (id: string) => {
  //   setShowRatingPopup(true);
  //   setSelectedKosId(id);
  // };

  const getProfile = async () => {
    try {
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
    const name = formData.name;
    const user_name = formData.user_name;
    const gender = formData.gender;
    const email = formData.email;
    const mobile = formData.mobile;
    e.preventDefault();
    const specialCharsRegex = /[^a-zA-Z0-9_]+/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;

    if (specialCharsRegex.test(name) || specialCharsRegex.test(user_name)) {
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

    try {
      const formData = new FormData();
      if (selectedImage) {
        formData.append("photo_profile", selectedImage);
        formData.append("name", name);
        formData.append("user_name", user_name);
        formData.append("gender", gender);
        formData.append("email", email);
        formData.append("mobile", mobile);
      }
      const response = await updateProfileSync(formData);
      setUploadedImageUrl(response.data.photo_profile);
      if (response.data) {
        toast({
          description: "Data telah Berhasil diubah",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: `Error, Anda Harus Mengupload Image dulu`,
      });
    }
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

  // const handleRatingSubmit = async (kosId: string | null, rating: number) => {
  //   try {
  //     if (kosId) {
  //       const response = await ratingSubmitSync(kosId, rating);
  //       if (response) {
  //         toast({
  //           description: "Berhasil menambahkan Rating",
  //         });
  //         showRating(true);
  //       }
  //     }
  //   } catch (error: any) {
  //     toast({
  //       variant: "destructive",
  //       description: "Kamu sudah Menambah Rating Sebelumnya",
  //     });
  //     showRating(true);
  //   } finally {
  //     setSelectedKosId(null);
  //    // setShowRatingPopup(false);
  //   }
  // };

  // const cekKost = async () => {
  //   try {
  //     const response = await cekKostSync();
  //     if (response.length < 1) {
  //       setStatus(!status);
  //     } else {
  //       setStatus(!status);
  //       setDataKos(response);
  //     }
  //   } catch (error: any) {
  //     toast({
  //       variant: "destructive",
  //       description: "Kamu Belum Pernah Booking Apartements",
  //     });
  //   }
  // };

  // const cancelBooking = async (bookingId: string) => {
  //   try {
  //     const response = await cancelBookingSync(`${bookingId}`);
  //     if (response) {
  //       toast({
  //         description: "Pesanan dibatalkan",
  //       });
  //     }
  //   } catch (error: any) {
  //     toast({
  //       variant: "destructive",
  //       description: "Anda tidak dapat membatalkan Pesanan",
  //     });
  //   }
  // };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handlePerubahan = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setformData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  useEffect(() => {
    getProfile();
   // cekKost();
  }, []);

  // useEffect(() => {
  //   cekKost();
  // }, []);

  return (
    <>
      <Layout>
        <div className="flex flex-col min-h-[80vh] justify-center items-center px-8 pb-4 overflow-y-scroll bg-white shadow-sm ">
          <div className="self-center w-full max-w-[1353px] max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
              <div className="flex flex-col 2xl:w-[40vw] h-[40vh] w-[40%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow py-11 pr-12 pl-6 w-full text-base leading-7 bg-white rounded border border-solid shadow-sm border-stone-400 max-md:px-5 max-md:mt-6 max-md:max-w-full">
                  <form onSubmit={updateProfile}>
                    <div className="flex justify-center items-center px-7 text-sm font-medium leading-6 text-black whitespace-nowrap bg-white rounded max-md:px-5 max-md:max-w-full">
                      <div className="flex flex-col items-center max-w-full w-[158px]">
                        {selectedImage ? (
                          <img loading="lazy" srcSet={URL.createObjectURL(selectedImage)} className=" rounded-full h-[7rem] w-[7rem] border-2 border-stone-400" />
                        ) : (
                          <img
                            loading="lazy"
                            srcSet={
                              formData.photo_profile
                                ? formData.photo_profile
                                : `data:image/png;base64,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`
                            }
                            className="rounded-full h-[7rem] w-[7rem] border-2 border-stone-400"
                          />
                        )}
                        <div onClick={() => document.getElementById("uploadInput")?.click()} className="justify-center px-3 py-1.5 mt-5 rounded-md bg-zinc-300">
                          Ubah Foto
                        </div>

                        <div
                          className="GantiCover"
                          style={{
                            width: 40,
                            height: 20,
                            position: "absolute",
                            top: 0,
                            right: 0,
                            padding: "5px",
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                          }}
                        >
                          <label htmlFor="uploadInput" className="Cover" style={{ width: 70, height: 15, display: "flex", alignItems: "center" }}>
                            <input type="file" id="uploadInput" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-5 justify-between mt-5 whitespace-nowrap text-zinc-900 max-md:flex-wrap max-md:max-w-full">
                      <div className="self-center">Name</div>
                      <div className="input-container">
                        <input
                          id="name"
                          onChange={handlePerubahan}
                          required
                          value={formData.name}
                          type="text"
                          placeholder="Masukan Nama"
                          className=" grow focus:outline-none w-[45vw] 2xl:w-[18vw] md:w-[22vw] p-4 bg-white rounded border border-solid shadow-sm border-zinc-400"
                        />
                      </div>
                    </div>

                    <div className="flex gap-5 justify-between mt-5 text-zinc-900 max-md:flex-wrap max-md:max-w-full">
                      <div className="flex-auto self-center">Jenis Kelamin</div>
                      <div className="input-container">
                        <select id="gender" onChange={handlePerubahan} value={formData.gender} className=" focus:outline-none w-[45vw] 2xl:w-[18vw] md:w-[22vw] p-4 bg-white rounded border border-solid shadow-sm border-zinc-400 max-md:pr-5">
                          <option value="" disabled>
                            Pilih Jenis Kelamin
                          </option>
                          <option value="laki-laki">Laki-Laki</option>
                          <option value="perempuan">Perempuan</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-5 justify-between mt-4 w-full whitespace-nowrap text-zinc-900 max-md:flex-wrap max-md:max-w-full">
                      <div className="self-center">Username</div>
                      <div className="input-container">
                        <input
                          id="user_name"
                          onChange={handlePerubahan}
                          value={formData.user_name}
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
                        id="mobile"
                        onChange={handlePerubahan}
                        value={formData.mobile}
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
              </div>

              {/* <div className="flex flex-col ml-5 md:ml-0 2xl:w-[80vw] w-[60%] max-md:ml-0 max-md:w-full border-[0.3px]">
                <div className="flex flex-col grow items-center px-16 md:px-6 py-11 w-full text-sm bg-white rounded shadow-sm text-zinc-900 max-md:px-5 max-md:mt-6 max-md:max-w-full">
                  <div className="flex items-center self-start gap-2 text-lg leading-7 max-md:max-w-full">
                    <img src="https://img.icons8.com/windows/32/smart-home-2.png" alt="home" className="w-[20px]" />
                    <span>Riwayat Rent</span>
                  </div>
                  {status ? (
                    <div>
                      <div className="mt-16 text-2xl font-bold leading-9 whitespace-nowrap max-md:mt-10">Kamu belum menyewa Apartement</div>
                      <div className="mt-10 leading-6 md:w-[409px] w-full">Yuk, sewa di Gold Coast Bahama PIK jakarta untuk aktifkan halaman ini Coba cara Apartement modern dengan unik</div>
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
                        <div
                          className="justify-center cursor-pointer items-center self-end px-16 py-6 mt-7 mr-6 max-w-full text-center text-white whitespace-nowrap bg-lime-600 rounded-sm shadow-sm leading-[171%] w-[476px] max-md:px-5 max-md:mr-2.5"
                          onClick={() => navigate("/")}
                        >
                          Mulai cari dan sewa kos
                        </div>
                      </div>
                    </div>
                  ) : (
                    <> */}
                      {/* {dataKos && (
                        <>
                          {dataKos &&
                            dataKos.map((item: any, index: number) => (
                              <>
                                <div key={index} className=" md:pr-11 mt-11 overflow-hidden bg-zinc-100 rounded-[60px_60px_60px_12px] max-md:mt-10 max-md:max-w-full">
                                  <div className="flex gap-3 max-md:flex-col  max-md:gap-0 max-md:">
                                    <div className="flex flex-col w-[55%] max-md:ml-0 max-md:w-full overflow-hidden">
                                      <img loading="lazy" srcSet={item.kos_main_foto ? item.kos_main_foto : `${logo}`} className="w-full md:h-full h-[12rem]  border-2 border-slate-100 " />
                                    </div>
                                    <div className="flex flex-col ml-5 w-[45%] max-md:ml-0 max-md:w-full">
                                      <div className="flex flex-col grow py-5 md:py-11 max-md:px-5">
                                        <div className="flex items-center justify-between">
                                          <h2 className="cursor-pointer font-bold text-base">{item.kos_name ? item.kos_name : "Abdul"}</h2>
                                        </div>
                                        <div>
                                          <div className="flex gap-3 justify-between mt-3.5 text-base whitespace-nowrap">
                                            <div className="grow my-auto text-neutral-900 text-sm">
                                              Tanggal Sewa : {item.start_date} - {`${resultEndDate}`}
                                            </div>
                                          </div>
                                          <div className="flex gap-3 justify-between mt-3.5 text-base whitespace-nowrap">
                                            <div className="grow my-auto text-neutral-900 text-sm">
                                              Total Harga: <NumberFormatter value={item.total_harga ? item.total_harga : 0} /> /bulan
                                            </div>
                                          </div>
                                          <div className="flex gap-3 justify-between mt-3.5 text-base whitespace-nowrap">
                                            <div className="grow my-auto text-neutral-900 text-sm">Status Pembayaran : {item.payment_status}</div>
                                          </div>
                                        </div>

                                        <div className="mt-6  text-base whitespace-nowrap text-neutral-900 max-md:ml-2.5 flex gap-3 justify-start items-center">
                                          <img width="20" height="20" src="https://img.icons8.com/ios/50/marker--v1.png" alt="marker--v1" />{" "}
                                          <span className="text-xs w-full whitespace-pre-line">{item.kos_lokasi ? item.kos_lokasi : "alamat dirahasiakan sistem"}</span>
                                        </div>
                                        <div className="flex gap-5 justify-between mt-8 text-xs font-bold leading-5">
                                          <div className="flex gap-2 justify-between whitespace-nowrap text-stone-950">
                                            {item.payment_status !== "cancelled" ? (
                                              <>
                                                <AlertDelete onAction={() => cancelBooking(item.order_id)} title="Apakah anda yakin ?" background="bg-red-500" description="Apakah anda yakin ingin membatalkan pesanan yang telah dibuat">
                                                  <button className="px-3 py-2 border-2 border-slate-300 rounded-md">Cancel Booking</button>
                                                </AlertDelete>
                                                {!rating ? (
                                                  <button onClick={() => addRating(item.kos_id)} className="px-3 py-2 bg-lime-600 text-white rounded-md">
                                                    Add Rating
                                                  </button>
                                                ) : (
                                                  <div className="flex gap-2 justify-between whitespace-nowrap text-stone-950">
                                                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3064243ec75f1730094f8347466f60fab0cc73015f1520a7cd67831cd2fbc934?" className="w-5 aspect-square" />
                                                    <div className="my-auto">{item.kos_rating === 0 ? showRating(false) : item.kos_rating}</div>
                                                  </div>
                                                )}
                                              </>
                                            ) : (
                                              <div className="flex gap-2 justify-between whitespace-nowrap text-stone-950">
                                                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3064243ec75f1730094f8347466f60fab0cc73015f1520a7cd67831cd2fbc934?" className="w-5 aspect-square" />
                                                <div className="my-auto">{item.kos_rating}</div>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ))}
                        </>
                      )}
                    </>
                  )} */}

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
                              onChange={(e: any) => setFormPassword((prev) => ({ ...prev, old_password: e.target.value }))}
                            />

                            <div className="mt-8 text-xs max-md:max-w-full">Password Baru</div>
                            <input
                              required
                              type={!showPassword ? "password" : "text"}
                              className="justify-center p-3 mt-1.5 whitespace-nowrap bg-white rounded-md border border-solid shadow-sm border-slate-600 border-opacity-40 max-md:max-w-full"
                              placeholder="*******"
                              onChange={(e: any) => setFormPassword((prev) => ({ ...prev, new_password: e.target.value }))}
                            />

                            <div className="mt-8 text-xs max-md:max-w-full">Konfirmasi Password Baru</div>
                            <input
                              required
                              type={!showPassword ? "password" : "text"}
                              className="justify-center p-3 mt-1.5 whitespace-nowrap bg-white rounded-md border border-solid shadow-sm border-slate-600 border-opacity-40 max-md:max-w-full"
                              placeholder="*******"
                              onChange={(e: any) => setFormPassword((prev) => ({ ...prev, konfirmasi_password: e.target.value }))}
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
                  {/* <RatingPopup show={showRatingPopup} onClose={() => setShowRatingPopup(false)} onRate={(rating: number) => handleRatingSubmit(selectedKosId, rating)} /> */}
                </div>
              </div>
            </div>
          {/* </div>
        </div> */}
      </Layout>
    </>
  );
};

export default ProfileRenter;
