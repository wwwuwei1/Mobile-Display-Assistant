import React, { useState } from 'react';
import { Home, MessageSquare, Sparkles, User, Search, ChevronRight, Copy, Share2, ArrowLeft, Smartphone, Scale, Tag, CheckCircle2, Send, Plus, Phone, MoreHorizontal, MessageCircle, ThumbsUp, ThumbsDown, ImagePlus, X, Heart, Clock, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface Phone {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  specs: {
    screen: string;
    processor: string;
    camera: string;
    battery: string;
  };
  tags: string[];
  pitch: string;
  summary: string;
  pros: string[];
  cons: string[];
}

// --- Mock Data ---
const MOCK_PHONES: Phone[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    price: 9999,
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=400&auto=format&fit=crop',
    specs: {
      screen: '6.7" OLED 120Hz',
      processor: 'A17 Pro',
      camera: '48MP主摄 + 5倍长焦',
      battery: '4422mAh'
    },
    tags: ['钛金属', 'A17 Pro', '5倍光学变焦'],
    pitch: '您好，这是苹果最新款的 iPhone 15 Pro Max。它采用了航空级钛金属边框，不仅更坚固，而且重量更轻，手感极佳。搭载了目前最强的 A17 Pro 芯片，无论是玩大型游戏还是日常使用都非常流畅。最棒的是它的拍照，支持5倍光学变焦，拍远景非常清晰。',
    summary: '苹果目前的顶级旗舰，最大的亮点是换了钛金属边框，拿在手里轻了不少。拍照方面加入了5倍长焦，拍远处的风景更清晰了。非常适合追求极致体验、预算充足的苹果老用户。',
    pros: ['系统流畅，用几年都不卡', '钛金属边框，手感轻盈', '录像效果目前手机界第一'],
    cons: ['充电速度相对较慢', '价格比较昂贵']
  },
  {
    id: '2',
    name: 'HUAWEI Mate 60 Pro',
    brand: 'Huawei',
    price: 6999,
    image: 'https://images.unsplash.com/photo-1649859398021-afbfe80e83b9?q=80&w=400&auto=format&fit=crop',
    specs: {
      screen: '6.82" OLED 120Hz',
      processor: '麒麟 9000S',
      camera: '50MP主摄 + 48MP长焦',
      battery: '5000mAh'
    },
    tags: ['卫星通话', '昆仑玻璃', '玄武架构'],
    pitch: '这款是华为 Mate 60 Pro，目前非常火爆。它最大的亮点是支持卫星通话，即使在没有手机信号的地方也能打电话，非常适合喜欢户外的朋友。屏幕采用了第二代昆仑玻璃，非常耐摔。而且它的拍照效果一如既往的出色，支持微距长焦。',
    summary: '华为的“争气机”！不仅支持卫星通话（没信号也能打电话），而且系统非常流畅。外观设计很有辨识度，拿出去很有面子。适合商务人士或者有户外需求的朋友。',
    pros: ['支持卫星通话，关键时刻能救命', '鸿蒙系统流畅，多设备互联方便', '抗摔耐造，质量好'],
    cons: ['处理器绝对性能不是最顶尖的', '机身稍微有点宽和重']
  },
  {
    id: '3',
    name: 'Xiaomi 14 Ultra',
    brand: 'Xiaomi',
    price: 6499,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=400&auto=format&fit=crop',
    specs: {
      screen: '6.73" AMOLED 120Hz',
      processor: '骁龙 8 Gen 3',
      camera: '50MP x4 徕卡光学',
      battery: '5300mAh'
    },
    tags: ['徕卡光学', '骁龙8 Gen3', '双向卫星通信'],
    pitch: '喜欢拍照的话，强烈推荐这款小米 14 Ultra。它配备了徕卡光学镜头，四个镜头都是5000万像素，拍照非常有质感，随手一拍就是大片。性能方面搭载了最新的骁龙8 Gen 3处理器，电池容量也很大，续航完全不用担心。',
    summary: '这是一台“能打电话的专业相机”。四个镜头都是主摄级别，加上徕卡调色，随手一拍就是大片。如果你平时非常喜欢拍照、记录生活，买它准没错。',
    pros: ['徕卡影像，拍照非常有质感', '电池大，续航时间长', '屏幕显示效果极佳'],
    cons: ['背部镜头凸起比较明显', '手机整体偏厚重']
  },
  {
    id: '4',
    name: 'vivo X100 Pro',
    brand: 'vivo',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=400&auto=format&fit=crop',
    specs: {
      screen: '6.78" AMOLED 120Hz',
      processor: '天玑 9300',
      camera: '50MP 蔡司APO长焦',
      battery: '5400mAh'
    },
    tags: ['蔡司影像', '天玑9300', '超大电池'],
    pitch: '如果您看重人像拍照，vivo X100 Pro 绝对是首选。它搭载了蔡司APO超级长焦，拍人像非常有氛围感。性能上首发天玑9300，跑分极高，而且5400mAh大电池让您告别电量焦虑。',
    summary: '拍人像最好看的手机之一。蔡司镜头加持，拍女朋友或者小孩特别出片。而且电池特别大，出门一天完全不用带充电宝。',
    pros: ['蔡司人像，拍人特别好看', '5400毫安大电池，续航无敌', '系统动画流畅丝滑'],
    cons: ['屏幕分辨率只有1.5K，没到2K', '短焦指纹，位置偏下']
  },
  {
    id: '5',
    name: 'OPPO Find X7 Ultra',
    brand: 'OPPO',
    price: 5999,
    image: 'https://images.unsplash.com/photo-1512054502232-10a0a035d672?q=80&w=400&auto=format&fit=crop',
    specs: {
      screen: '6.82" AMOLED 120Hz',
      processor: '骁龙 8 Gen 3',
      camera: '双潜望四主摄',
      battery: '5000mAh'
    },
    tags: ['哈苏影像', '双潜望长焦', 'VIP模式'],
    pitch: '这款是 OPPO 的顶级旗舰 Find X7 Ultra。全球首发双潜望长焦，配合哈苏影像，远近都好拍。它还有独家的 VIP 模式，一键关闭摄像头和麦克风，非常适合注重隐私的高端商务人士。',
    summary: 'OPPO的年度机皇，拍照和质感都是顶级。有两个潜望长焦镜头，拍远景和人像都很强。还有专门的VIP模式，一键关闭摄像头和麦克风，保护隐私。',
    pros: ['双潜望长焦，远景人像都清晰', '哈苏色彩，照片很有故事感', 'VIP模式，商务隐私保护好'],
    cons: ['机身比较重，超过220g', '只有素皮版本，没有玻璃后盖']
  }
];

// --- Components ---

function NavItem({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-16 h-12 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400'}`}
    >
      <div className="mb-1">{icon}</div>
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}

function TemplateCard({ icon, title, bg }: { icon: React.ReactNode, title: string, bg: string }) {
  return (
    <div className={`${bg} rounded-2xl p-4 flex flex-col items-center justify-center text-center active:scale-95 transition-transform`}>
      <div className="mb-2">{icon}</div>
      <span className="text-xs font-bold text-gray-800">{title}</span>
    </div>
  );
}

function SpecItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-sm font-bold text-gray-900">{value}</div>
    </div>
  );
}

function PitchCard({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative">
      <p className="text-sm text-gray-700 leading-relaxed pr-16">{text}</p>
      <button 
        onClick={handleCopy}
        className="absolute top-4 right-4 text-blue-600 bg-blue-50 p-2 rounded-lg active:scale-95 transition-transform"
      >
        {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}

function MenuItem({ icon, title, onClick }: { icon: React.ReactNode, title: string, onClick?: () => void }) {
  return (
    <div onClick={onClick} className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm border border-gray-100 active:bg-gray-50 transition-colors cursor-pointer">
      <div className="flex items-center">
        <div className="mr-3">{icon}</div>
        <span className="font-medium text-gray-800">{title}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </div>
  );
}

// --- Tabs ---

function HomeTab({ onSelectPhone, onViewAll }: { onSelectPhone: (phone: Phone) => void, onViewAll: () => void }) {
  return (
    <div className="p-5">
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2.5 mb-6">
        <Search className="w-5 h-5 text-gray-400 mr-2" />
        <input type="text" placeholder="搜索手机型号、卖点..." className="bg-transparent outline-none w-full text-sm" />
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-900">极速展示模板</h2>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-8">
        <TemplateCard icon={<Smartphone className="w-6 h-6 text-blue-500" />} title="新机展示" bg="bg-blue-50" />
        <TemplateCard icon={<Scale className="w-6 h-6 text-purple-500" />} title="对比展示" bg="bg-purple-50" />
        <TemplateCard icon={<Tag className="w-6 h-6 text-red-500" />} title="促销展示" bg="bg-red-50" />
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-900">热门机型</h2>
        <button onClick={onViewAll} className="text-xs text-blue-600 font-medium active:opacity-70">查看全部</button>
      </div>
      <div className="space-y-3">
        {MOCK_PHONES.slice(0, 3).map(phone => (
          <div 
            key={phone.id} 
            onClick={() => onSelectPhone(phone)} 
            className="flex bg-white border border-gray-100 rounded-2xl p-3 shadow-sm active:scale-95 transition-transform"
          >
            <img src={phone.image} alt={phone.name} className="w-24 h-24 object-cover rounded-xl bg-gray-50" />
            <div className="ml-4 flex-1 flex flex-col justify-between py-1">
              <div>
                <h3 className="font-bold text-gray-900 text-base">{phone.name}</h3>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {phone.tags.slice(0,2).map(tag => (
                    <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-red-500 font-bold text-lg">¥{phone.price}</span>
                <div className="bg-blue-50 p-1.5 rounded-full">
                  <ChevronRight className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecommendTab() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    { id: 'budget', title: '客户的预算大概是多少？', options: ['3000元以下', '3000-5000元', '5000元以上'] },
    { id: 'usage', title: '主要用来做什么？', options: ['日常通讯', '玩大型游戏', '拍照摄影'] },
    { id: 'os', title: '偏好哪个系统？', options: ['苹果 iOS', '安卓 Android', '无所谓'] },
  ];

  const handleSelect = (opt: string) => {
    setAnswers({...answers, [questions[step].id]: opt});
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setStep(step + 1); // Show result
    }
  };

  return (
    <div className="p-6 h-full flex flex-col bg-white">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">智能顾问引擎</h2>
        <p className="text-gray-500 text-sm">只需3个问题，为您推荐最适合客户的机型</p>
      </div>

      {step < questions.length ? (
        <div className="flex-1">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              {questions.map((_, idx) => (
                <div key={idx} className="flex items-center">
                  <div className={`w-8 h-1 rounded-full ${idx <= step ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                  {idx < questions.length - 1 && <div className="w-2"></div>}
                </div>
              ))}
            </div>
            <span className="text-blue-600 font-bold text-sm">问题 {step + 1}/{questions.length}</span>
            <h3 className="text-xl font-bold mt-2 text-gray-900">{questions[step].title}</h3>
          </div>
          <div className="space-y-3">
            {questions[step].options.map(opt => (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className="w-full text-left p-4 rounded-2xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-colors font-medium text-gray-800"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col items-center justify-center text-center"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
            <Sparkles className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-gray-900">推荐完成！</h3>
          <p className="text-gray-500 mb-8">根据客户需求，我们推荐以下机型：</p>
          
          <div className="w-full bg-white border border-gray-200 rounded-2xl p-4 shadow-sm text-left flex items-center">
             <img src={MOCK_PHONES[0].image} className="w-20 h-20 rounded-xl object-cover mr-4" />
             <div className="flex-1">
               <h4 className="font-bold text-gray-900 text-lg">{MOCK_PHONES[0].name}</h4>
               <div className="flex gap-1 mt-1 mb-2">
                 <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-medium">匹配度 98%</span>
               </div>
               <p className="text-red-500 text-lg font-bold">¥{MOCK_PHONES[0].price}</p>
             </div>
          </div>
          
          <button 
            onClick={() => {setStep(0); setAnswers({});}} 
            className="mt-10 text-blue-600 font-medium bg-blue-50 px-6 py-3 rounded-full"
          >
            重新评估
          </button>
        </motion.div>
      )}
    </div>
  );
}

function EditProfileModal({ onClose }: { onClose: () => void }) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-gray-50 z-50 flex flex-col"
    >
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center shrink-0 pt-10">
        <button onClick={onClose} className="p-2 -ml-2 active:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <h2 className="font-bold text-gray-900 ml-2">编辑个人资料</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 pb-32 space-y-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
          <div className="relative mb-4">
            <img src={avatarPreview || ''} className="w-24 h-24 rounded-full object-cover border-4 border-gray-50 shadow-sm" />
            <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md cursor-pointer active:scale-95 transition-transform">
              <ImagePlus className="w-4 h-4" />
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>
          <p className="text-xs text-gray-500 font-medium">点击更换头像</p>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-3 text-sm">基本信息</h3>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-500 px-1">昵称</label>
              <input type="text" defaultValue="手机达人" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-500 px-1">联系电话</label>
              <input type="text" defaultValue="138****8000" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-500 px-1">个人简介</label>
              <textarea placeholder="介绍一下自己吧..." rows={3} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors resize-none"></textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 p-4 pb-8 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => {
            alert('资料保存成功！(演示功能)');
            onClose();
          }}
          className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl active:scale-95 transition-transform shadow-md shadow-blue-200"
        >
          保存修改
        </button>
      </div>
    </motion.div>
  );
}

function ProfileTab({ onAddPhone, onEditProfile, onOpenFavorites, onOpenHistory }: { onAddPhone: () => void, onEditProfile: () => void, onOpenFavorites: () => void, onOpenHistory: () => void }) {
  return (
    <div className="bg-gray-50 min-h-full">
      {/* Header */}
      <div 
        onClick={onEditProfile}
        className="bg-gradient-to-r from-blue-600 to-blue-500 pt-12 pb-20 px-6 rounded-b-[40px] text-white active:scale-[0.98] transition-transform cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" alt="avatar" className="w-16 h-16 rounded-full border-2 border-white/30 object-cover" />
            <div className="ml-4">
              <h2 className="text-xl font-bold">手机达人</h2>
              <div className="text-sm text-blue-100 mt-1">138****8000</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-blue-200" />
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 -mt-10 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex justify-between text-center">
          <div className="flex-1 cursor-pointer active:scale-95 transition-transform" onClick={onOpenFavorites}>
            <div className="text-xl font-bold text-gray-900">12</div>
            <div className="text-xs text-gray-500 mt-1">我的收藏</div>
          </div>
          <div className="w-px bg-gray-100 my-2"></div>
          <div className="flex-1 cursor-pointer active:scale-95 transition-transform" onClick={onOpenHistory}>
            <div className="text-xl font-bold text-gray-900">45</div>
            <div className="text-xs text-gray-500 mt-1">浏览足迹</div>
          </div>
          <div className="w-px bg-gray-100 my-2"></div>
          <div className="flex-1">
            <div className="text-xl font-bold text-gray-900">3</div>
            <div className="text-xs text-gray-500 mt-1">优惠券</div>
          </div>
        </div>
      </div>

      {/* Customer Services */}
      <div className="px-5 mb-6 space-y-3">
        <h3 className="font-bold text-gray-900 mb-2 px-1 text-sm">我的服务</h3>
        <MenuItem icon={<Heart className="w-5 h-5 text-red-500" />} title="我的收藏" onClick={onOpenFavorites} />
        <MenuItem icon={<Clock className="w-5 h-5 text-blue-500" />} title="浏览足迹" onClick={onOpenHistory} />
        <MenuItem icon={<HelpCircle className="w-5 h-5 text-orange-500" />} title="帮助与客服" />
      </div>

      {/* Seller Services */}
      <div className="px-5 pb-8 space-y-3">
        <h3 className="font-bold text-gray-900 mb-2 px-1 text-sm">发布货源</h3>
        <MenuItem icon={<Plus className="w-5 h-5 text-blue-500" />} title="发布闲置/二手机型" onClick={onAddPhone} />
      </div>
    </div>
  );
}

function PhoneListModal({ title, phones, onClose, onSelectPhone }: { title: string, phones: Phone[], onClose: () => void, onSelectPhone: (phone: Phone) => void }) {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-gray-50 z-50 flex flex-col"
    >
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center shrink-0 pt-10">
        <button onClick={onClose} className="p-2 -ml-2 active:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <h2 className="font-bold text-gray-900 ml-2">{title}</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3 pb-8">
          {phones.map(phone => (
            <div 
              key={phone.id} 
              onClick={() => onSelectPhone(phone)}
              className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm active:scale-95 transition-transform flex flex-col"
            >
              <img src={phone.image} alt={phone.name} className="w-full h-32 object-cover rounded-xl bg-gray-50 mb-3" />
              <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{phone.name}</h3>
              <div className="text-[10px] text-gray-500 mt-1 mb-2 line-clamp-1">{phone.tags.join(' | ')}</div>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-red-500 font-bold text-sm">¥{phone.price}</span>
                <div className="bg-blue-50 p-1 rounded-full">
                  <ChevronRight className="w-3 h-3 text-blue-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function AllPhonesList({ onClose, onSelectPhone }: { onClose: () => void, onSelectPhone: (phone: Phone) => void }) {
  return <PhoneListModal title="全部机型" phones={MOCK_PHONES} onClose={onClose} onSelectPhone={onSelectPhone} />;
}

function PhoneDetail({ phone, onClose }: { phone: Phone, onClose: () => void }) {
  const [comparePhone, setComparePhone] = useState<Phone | null>(null);
  const otherPhones = MOCK_PHONES.filter(p => p.id !== phone.id);

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-white z-50 flex flex-col"
    >
      <div className="relative h-72 bg-gray-100 shrink-0">
        <button 
          onClick={onClose} 
          className="absolute top-6 left-4 p-2.5 bg-white/80 rounded-full backdrop-blur z-10 shadow-sm active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <img src={phone.image} alt={phone.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-28 -mt-6 relative z-10">
        <div className="flex justify-between items-start mb-3">
          <h1 className="text-2xl font-bold text-gray-900">{phone.name}</h1>
          <span className="text-2xl font-bold text-red-500">¥{phone.price}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {phone.tags.map(tag => (
            <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md font-medium">{tag}</span>
          ))}
        </div>

        {/* 通俗介绍与优缺点 */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-900 mb-4 text-lg">总结评价</h3>
          <div className="bg-gray-50 p-4 rounded-2xl text-sm text-gray-700 leading-relaxed mb-4 border border-gray-100">
            {phone.summary}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50/80 p-3.5 rounded-2xl border border-green-100">
              <div className="flex items-center text-green-700 font-bold mb-2 text-sm">
                <ThumbsUp className="w-4 h-4 mr-1.5" /> 优点
              </div>
              <ul className="text-xs text-green-800 space-y-2">
                {phone.pros.map((pro, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-1.5 mt-0.5">•</span>
                    <span className="leading-tight">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50/80 p-3.5 rounded-2xl border border-red-100">
              <div className="flex items-center text-red-700 font-bold mb-2 text-sm">
                <ThumbsDown className="w-4 h-4 mr-1.5" /> 顾虑点
              </div>
              <ul className="text-xs text-red-800 space-y-2">
                {phone.cons.map((con, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-1.5 mt-0.5">•</span>
                    <span className="leading-tight">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 mb-4 text-lg">核心参数</h3>
        <div className="grid grid-cols-2 gap-3 mb-8">
          <SpecItem label="屏幕" value={phone.specs.screen} />
          <SpecItem label="处理器" value={phone.specs.processor} />
          <SpecItem label="影像" value={phone.specs.camera} />
          <SpecItem label="电池" value={phone.specs.battery} />
        </div>

        <h3 className="font-bold text-gray-900 mb-4 text-lg">机型对比</h3>
        {!comparePhone ? (
          <div className="flex overflow-x-auto pb-4 gap-3 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {otherPhones.map(p => (
              <div 
                key={p.id} 
                onClick={() => setComparePhone(p)} 
                className="shrink-0 w-28 bg-white border border-gray-100 rounded-xl p-3 flex flex-col items-center snap-center active:scale-95 transition-transform shadow-sm"
              >
                <img src={p.image} className="w-14 h-14 object-cover rounded-lg mb-2 bg-gray-50" />
                <span className="text-xs font-bold text-gray-800 text-center line-clamp-1 w-full">{p.name}</span>
                <span className="text-[10px] text-blue-600 mt-2 bg-blue-50 px-2 py-0.5 rounded-full font-medium">点击对比</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm relative">
            <button 
              onClick={() => setComparePhone(null)} 
              className="absolute top-3 right-3 p-1.5 bg-gray-50 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Plus className="w-4 h-4 rotate-45" />
            </button>
            <div className="flex justify-between items-end mb-6 mt-2 px-2">
              <div className="flex-1 flex flex-col items-center">
                <img src={phone.image} className="w-12 h-12 object-cover rounded-lg mb-2 shadow-sm" />
                <div className="text-xs font-bold text-center line-clamp-1">{phone.name}</div>
              </div>
              <div className="px-3 text-gray-300 font-black text-lg italic mb-4">VS</div>
              <div className="flex-1 flex flex-col items-center">
                <img src={comparePhone.image} className="w-12 h-12 object-cover rounded-lg mb-2 shadow-sm" />
                <div className="text-xs font-bold text-center line-clamp-1">{comparePhone.name}</div>
              </div>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                <span className="flex-1 text-center text-red-500 font-bold text-sm">¥{phone.price}</span>
                <span className="w-12 text-center text-gray-400 text-[10px]">价格</span>
                <span className="flex-1 text-center text-red-500 font-bold text-sm">¥{comparePhone.price}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                <span className="flex-1 text-center text-gray-800 font-medium">{phone.specs.processor}</span>
                <span className="w-12 text-center text-gray-400 text-[10px]">性能</span>
                <span className="flex-1 text-center text-gray-800 font-medium">{comparePhone.specs.processor}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                <span className="flex-1 text-center text-gray-800 font-medium">{phone.specs.screen}</span>
                <span className="w-12 text-center text-gray-400 text-[10px]">屏幕</span>
                <span className="flex-1 text-center text-gray-800 font-medium">{comparePhone.specs.screen}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                <span className="flex-1 text-center text-gray-800 font-medium">{phone.specs.camera}</span>
                <span className="w-12 text-center text-gray-400 text-[10px]">影像</span>
                <span className="flex-1 text-center text-gray-800 font-medium">{comparePhone.specs.camera}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex-1 text-center text-gray-800 font-medium">{phone.specs.battery}</span>
                <span className="w-12 text-center text-gray-400 text-[10px]">续航</span>
                <span className="flex-1 text-center text-gray-800 font-medium">{comparePhone.specs.battery}</span>
              </div>
            </div>
          </div>
        )}

        {/* 商家货源 */}
        <h3 className="font-bold text-gray-900 mt-8 mb-4 text-lg">商家货源</h3>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm flex items-center">
              <img src={phone.image} className="w-16 h-16 object-cover rounded-xl bg-gray-50" />
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-gray-900 text-sm">{phone.name}</h4>
                  <span className="text-red-500 font-bold text-sm">¥{phone.price - i * 500}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">{i === 1 ? '全新未拆封 / 官方标配' : '99新 / 电池100%'}</div>
                <div className="mt-2 flex justify-between items-center">
                  <div className="flex items-center text-xs text-gray-600">
                    <User className="w-3 h-3 mr-1" /> 商家_{i}892
                  </div>
                  <div className="bg-gray-50 text-gray-700 px-3 py-1 rounded-full text-xs font-medium flex items-center border border-gray-100">
                    <Phone className="w-3 h-3 mr-1" /> 138****{i}892
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 p-4 flex gap-3 pb-8 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <button className="flex-1 bg-blue-50 text-blue-600 font-bold py-3.5 rounded-xl flex items-center justify-center active:scale-95 transition-transform">
          <Share2 className="w-5 h-5 mr-2" /> 生成海报
        </button>
        <button className="flex-1 bg-blue-600 text-white font-bold py-3.5 rounded-xl active:scale-95 transition-transform shadow-md shadow-blue-200">
          立即分享
        </button>
      </div>
    </motion.div>
  );
}

function AddPhoneModal({ onClose }: { onClose: () => void }) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-gray-50 z-50 flex flex-col"
    >
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center shrink-0 pt-10">
        <button onClick={onClose} className="p-2 -ml-2 active:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <h2 className="font-bold text-gray-900 ml-2">发布机型</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 pb-32 space-y-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-3 text-sm">基本信息</h3>
          <div className="space-y-3">
            <input type="text" placeholder="手机名称 (如: iPhone 15)" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors" />
            <input type="text" placeholder="品牌 (如: Apple)" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors" />
            <input type="number" placeholder="价格 (¥)" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors" />
            <input type="text" placeholder="联系方式 (微信号/手机号)" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors" />
            
            <div className="mt-2">
              {imagePreview ? (
                <div className="relative w-full h-40 rounded-xl overflow-hidden border border-gray-200">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setImagePreview(null)}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full backdrop-blur-sm active:scale-95 transition-transform"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImagePlus className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 font-medium">点击选择手机图片</p>
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-3 text-sm">核心参数</h3>
          <div className="space-y-3">
            <input type="text" placeholder="屏幕 (如: 6.7英寸 OLED)" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors" />
            <input type="text" placeholder="处理器 (如: A17 Pro)" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors" />
            <input type="text" placeholder="影像 (如: 4800万主摄)" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors" />
            <input type="text" placeholder="电池 (如: 4422mAh)" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-3 text-sm">评价与卖点</h3>
          <div className="space-y-3">
            <input type="text" placeholder="标签 (用逗号分隔)" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors" />
            <textarea placeholder="总结评价 (大白话介绍)" rows={3} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors resize-none"></textarea>
            <textarea placeholder="优点 (用逗号分隔)" rows={2} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors resize-none"></textarea>
            <textarea placeholder="顾虑点 (用逗号分隔)" rows={2} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors resize-none"></textarea>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 p-4 pb-8 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => {
            alert('手机发布成功！(演示功能)');
            onClose();
          }}
          className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl active:scale-95 transition-transform shadow-md shadow-blue-200"
        >
          确认发布
        </button>
      </div>
    </motion.div>
  );
}

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedPhone, setSelectedPhone] = useState<Phone | null>(null);
  const [showAllPhones, setShowAllPhones] = useState(false);
  const [showAddPhone, setShowAddPhone] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="flex justify-center bg-gray-200 min-h-screen font-sans">
      <div className="w-full max-w-md bg-white h-screen flex flex-col relative shadow-2xl overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto pb-20">
          {activeTab === 'home' && <HomeTab onSelectPhone={setSelectedPhone} onViewAll={() => setShowAllPhones(true)} />}
          {activeTab === 'recommend' && <RecommendTab />}
          {activeTab === 'profile' && (
            <ProfileTab 
              onAddPhone={() => setShowAddPhone(true)} 
              onEditProfile={() => setShowEditProfile(true)} 
              onOpenFavorites={() => setShowFavorites(true)}
              onOpenHistory={() => setShowHistory(true)}
            />
          )}
        </div>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-200 flex justify-around py-2 pb-6 z-40">
          <NavItem icon={<Home className="w-6 h-6" />} label="首页" isActive={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavItem icon={<Sparkles className="w-6 h-6" />} label="推荐" isActive={activeTab === 'recommend'} onClick={() => setActiveTab('recommend')} />
          <NavItem icon={<User className="w-6 h-6" />} label="我的" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        </nav>

        {/* All Phones Modal */}
        <AnimatePresence>
          {showAllPhones && (
            <AllPhonesList 
              onClose={() => setShowAllPhones(false)} 
              onSelectPhone={setSelectedPhone} 
            />
          )}
        </AnimatePresence>

        {/* Phone Detail Modal */}
        <AnimatePresence>
          {selectedPhone && (
            <PhoneDetail phone={selectedPhone} onClose={() => setSelectedPhone(null)} />
          )}
        </AnimatePresence>

        {/* Add Phone Modal */}
        <AnimatePresence>
          {showAddPhone && (
            <AddPhoneModal onClose={() => setShowAddPhone(false)} />
          )}
        </AnimatePresence>

        {/* Edit Profile Modal */}
        <AnimatePresence>
          {showEditProfile && (
            <EditProfileModal onClose={() => setShowEditProfile(false)} />
          )}
        </AnimatePresence>

        {/* Favorites Modal */}
        <AnimatePresence>
          {showFavorites && (
            <PhoneListModal 
              title="我的收藏" 
              phones={MOCK_PHONES.slice(0, 2)} 
              onClose={() => setShowFavorites(false)} 
              onSelectPhone={setSelectedPhone} 
            />
          )}
        </AnimatePresence>

        {/* History Modal */}
        <AnimatePresence>
          {showHistory && (
            <PhoneListModal 
              title="浏览足迹" 
              phones={MOCK_PHONES.slice(1, 4)} 
              onClose={() => setShowHistory(false)} 
              onSelectPhone={setSelectedPhone} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
