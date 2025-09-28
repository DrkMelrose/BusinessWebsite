'use client';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

const LeadSchema = z.object({
  name: z.string().min(1, "Введите имя"),
  email: z.string().email("Неверный email"),
  message: z.string().min(5, "Сообщение слишком короткое"),
});

type LeadInput = z.infer<typeof LeadSchema>;

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LeadInput>();
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (data: LeadInput) => {
    setOk(null); setErr(null);
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      setOk("Спасибо! Мы связемся с вами в ближайшее время.");
      reset();
    } else {
      const t = await res.text();
      setErr(t || "Ошибка отправки");
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold mb-6">Связаться с нами</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="card space-y-4">
        <div>
          <label className="label">Имя</label>
          <input className="input" {...register("name", { required: true })} />
          {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="label">Email</label>
          <input className="input" {...register("email", { required: true })} />
          {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="label">Сообщение</label>
          <textarea className="input min-h-32" {...register("message", { required: true })} />
          {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>}
        </div>
        <button className="btn-primary btn" type="submit">Отправить</button>
        {ok && <p className="text-green-700">{ok}</p>}
        {err && <p className="text-red-700">{err}</p>}
      </form>
    </div>
  );
}
